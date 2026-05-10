import type { Product } from "@/lib/product-types";

function stripCombiningMarks(s: string): string {
  return s.normalize("NFD").replace(/\p{M}/gu, "");
}

function normalizeHeader(raw: string): string {
  return stripCombiningMarks(raw.trim().toLowerCase())
    .replace(/\s+/g, " ")
    .replace(/_/g, " ");
}

/** Mapea cabeceras habituales (ES/EN) a campos del modelo. */
function mapHeaderToField(header: string): keyof Omit<Product, "id"> | null {
  const h = normalizeHeader(header);

  const aliases: [string, keyof Omit<Product, "id">][] = [
    ["sku", "sku"],
    ["codigo", "sku"],
    ["código", "sku"],
    ["code", "sku"],
    ["id producto", "sku"],
    ["nombre", "nombre"],
    ["name", "nombre"],
    ["producto", "nombre"],
    ["titulo", "nombre"],
    ["título", "nombre"],
    ["descripcion", "nombre"],
    ["descripción", "nombre"],
    ["categoria", "categoria"],
    ["categoría", "categoria"],
    ["category", "categoria"],
    ["marca", "marca"],
    ["brand", "marca"],
    ["fabricante", "marca"],
    ["material", "material"],
    ["materiales", "material"],
  ];

  for (const [key, field] of aliases) {
    if (h === key) return field;
  }
  return null;
}

function cellToString(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return String(v).trim();
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `row-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Convierte la primera hoja de un Excel a filas de producto.
 * Usa la primera fila como cabecera; columnas no reconocidas se ignoran para el modelo.
 */
export async function parseExcelBufferToRows(buffer: ArrayBuffer): Promise<{
  products: Product[];
  unknownHeaders: string[];
}> {
  const XLSX = await import("xlsx");
  const wb = XLSX.read(buffer, { type: "array" });
  const firstName = wb.SheetNames[0];
  if (!firstName) {
    return { products: [], unknownHeaders: [] };
  }
  const sheet = wb.Sheets[firstName];
  const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: "",
    raw: false,
  }) as unknown[][];

  if (!matrix.length) {
    return { products: [], unknownHeaders: [] };
  }

  const headerRow = (matrix[0] ?? []).map((c) => cellToString(c));
  const fieldByCol: (keyof Omit<Product, "id"> | null)[] = headerRow.map(
    (h) => mapHeaderToField(h)
  );
  const unknownHeaders = headerRow.filter(
    (h, i) => h.length > 0 && fieldByCol[i] == null
  );

  const products: Product[] = [];
  for (let r = 1; r < matrix.length; r++) {
    const line = matrix[r];
    if (!line || !line.some((c) => cellToString(c).length > 0)) continue;

    const draft: Omit<Product, "id"> = {
      sku: "",
      nombre: "",
      categoria: "",
      marca: "",
      material: "",
    };

    for (let c = 0; c < fieldByCol.length; c++) {
      const field = fieldByCol[c];
      if (!field) continue;
      draft[field] = cellToString(line[c]);
    }

    if (!draft.sku && !draft.nombre) continue;

    products.push({ id: newId(), ...draft });
  }

  return { products, unknownHeaders };
}
