export type Product = {
  id: string;
  sku: string;
  nombre: string;
  categoria: string;
  marca: string;
  material: string;
};

/** Alias; mismo tipo que `Product`. */
export type ProductRow = Product;

export type ProductEditableField = "categoria" | "marca" | "material";

export type ProductField = keyof Omit<Product, "id">;

export type AuditLogAction =
  | "product.set_all"
  | "product.field_update"
  | "manual";

export type AuditLog = {
  id: string;
  at: number;
  action: AuditLogAction;
  message: string;
  productId?: string;
  field?: ProductField;
  from?: string;
  to?: string;
};

/** Entrada para `addAuditLog` (se asignan `id` y `at` si faltan). */
export type AuditLogDraft = Omit<AuditLog, "id" | "at"> &
  Partial<Pick<AuditLog, "id" | "at">>;
