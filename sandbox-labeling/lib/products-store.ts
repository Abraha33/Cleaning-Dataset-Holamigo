import { create } from "zustand";

import { parseExcelBufferToRows } from "@/lib/excel-products";
import type {
  AuditLog,
  AuditLogDraft,
  Product,
  ProductEditableField,
  ProductField,
  ProductRow,
} from "@/lib/product-types";
import {
  MOCK_CATEGORIAS,
  MOCK_MARCAS,
  MOCK_MATERIALES,
  createMockRows,
} from "@/lib/products-mock";

export type {
  Product,
  ProductRow,
  ProductField,
  ProductEditableField,
  AuditLog,
  AuditLogDraft,
} from "@/lib/product-types";

const MAX_AUDIT_LOGS = 500;

function newLogId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `log-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function finalizeDraft(draft: AuditLogDraft): AuditLog {
  return {
    id: draft.id ?? newLogId(),
    at: draft.at ?? Date.now(),
    action: draft.action,
    message: draft.message,
    productId: draft.productId,
    field: draft.field,
    from: draft.from,
    to: draft.to,
  };
}

type ProductsState = {
  products: Product[];
  auditLogs: AuditLog[];
  categorias: readonly string[];
  marcas: readonly string[];
  materiales: readonly string[];
  loadError: string | null;
  loadInfo: string | null;
  isParsing: boolean;
  setProducts: (products: Product[]) => void;
  updateProductField: (
    productId: string,
    field: ProductField,
    value: string
  ) => void;
  addAuditLog: (draft: AuditLogDraft) => void;
  loadMock: () => void;
  loadFromExcelFile: (file: File) => Promise<void>;
  clearMessages: () => void;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: createMockRows(),
  auditLogs: [],
  categorias: MOCK_CATEGORIAS,
  marcas: MOCK_MARCAS,
  materiales: MOCK_MATERIALES,
  loadError: null,
  loadInfo: null,
  isParsing: false,

  setProducts: (products) =>
    set((state) => {
      const entry = finalizeDraft({
        action: "product.set_all",
        message: `Catálogo actualizado: ${products.length} productos (antes ${state.products.length}).`,
      });
      return {
        products,
        auditLogs: [entry, ...state.auditLogs].slice(0, MAX_AUDIT_LOGS),
        loadError: null,
      };
    }),

  updateProductField: (productId, field, value) =>
    set((state) => {
      const prev = state.products.find((p) => p.id === productId);
      if (!prev) return state;
      const oldVal = prev[field];
      if (oldVal === value) return state;

      const entry = finalizeDraft({
        action: "product.field_update",
        productId,
        field,
        from: String(oldVal),
        to: String(value),
        message: `SKU ${prev.sku || productId}: ${field} "${String(oldVal)}" → "${String(value)}"`,
      });

      return {
        products: state.products.map((p) =>
          p.id === productId ? { ...p, [field]: value } : p
        ),
        auditLogs: [entry, ...state.auditLogs].slice(0, MAX_AUDIT_LOGS),
      };
    }),

  addAuditLog: (draft) =>
    set((state) => ({
      auditLogs: [finalizeDraft(draft), ...state.auditLogs].slice(
        0,
        MAX_AUDIT_LOGS
      ),
    })),

  loadMock: () => {
    get().setProducts(createMockRows());
    set({ loadInfo: "Datos demo cargados." });
  },

  clearMessages: () => set({ loadError: null, loadInfo: null }),

  loadFromExcelFile: async (file) => {
    set({ isParsing: true, loadError: null, loadInfo: null });
    try {
      const buf = await file.arrayBuffer();
      const { products, unknownHeaders } = await parseExcelBufferToRows(buf);
      if (!products.length) {
        set({
          loadError: "No se encontraron filas con SKU o nombre.",
          isParsing: false,
        });
        return;
      }
      get().setProducts(products);
      const hint =
        unknownHeaders.length > 0
          ? ` Cabeceras no mapeadas: ${unknownHeaders.slice(0, 5).join(", ")}${unknownHeaders.length > 5 ? "…" : ""}.`
          : "";
      set({
        loadInfo: `${products.length} filas desde "${file.name}".${hint}`,
        isParsing: false,
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Error al leer el archivo.";
      set({ loadError: message, isParsing: false });
    }
  },
}));
