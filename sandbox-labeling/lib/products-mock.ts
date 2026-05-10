import type { Product } from "@/lib/product-types";

/** Catálogos temporales para selects (sin backend). */
export const MOCK_CATEGORIAS = [
  "Calzado",
  "Ropa",
  "Accesorios",
  "Hogar",
  "Sin clasificar",
] as const;

export const MOCK_MARCAS = [
  "Nike",
  "Adidas",
  "Genérico",
  "Local",
  "Sin marca",
] as const;

export const MOCK_MATERIALES = [
  "Algodón",
  "Poliéster",
  "Cuero",
  "Goma",
  "Metal",
  "Sin especificar",
] as const;

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `row-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createMockRows(): Product[] {
  return [
    {
      id: newId(),
      sku: "SKU-1001",
      nombre: "Zapatilla urbana",
      categoria: "Calzado",
      marca: "Nike",
      material: "Goma",
    },
    {
      id: newId(),
      sku: "SKU-1002",
      nombre: "Remera básica",
      categoria: "Ropa",
      marca: "Genérico",
      material: "Algodón",
    },
    {
      id: newId(),
      sku: "SKU-1003",
      nombre: "Bolso tote",
      categoria: "Accesorios",
      marca: "Local",
      material: "Poliéster",
    },
  ];
}
