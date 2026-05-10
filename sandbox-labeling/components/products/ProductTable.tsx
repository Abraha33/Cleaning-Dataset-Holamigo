"use client";

import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product, ProductEditableField } from "@/lib/product-types";
import { cn } from "@/lib/utils";

const EMPTY_VALUE = "__pd_empty__";

export type ProductTableDictionaries = {
  categorias: readonly string[];
  marcas: readonly string[];
  materiales: readonly string[];
};

export type ProductTableProps = {
  products: Product[];
  dictionaries: ProductTableDictionaries;
  /** Se dispara al confirmar un valor en un select de diccionario. */
  onFieldChange: (
    productId: string,
    field: ProductEditableField,
    value: string
  ) => void;
  className?: string;
  /** Contenedor scrollable (altura máxima). */
  scrollClassName?: string;
};

function mergeOptions(
  catalog: readonly string[],
  current: string
): string[] {
  const set = new Set<string>(catalog);
  const t = current.trim();
  if (t && t !== EMPTY_VALUE) set.add(t);
  return Array.from(set);
}

function DictionarySelect({
  productId,
  field,
  value,
  catalog,
  onChange,
}: {
  productId: string;
  field: ProductEditableField;
  value: string;
  catalog: readonly string[];
  onChange: ProductTableProps["onFieldChange"];
}) {
  const options = useMemo(() => mergeOptions(catalog, value), [catalog, value]);
  const selectValue = value.trim() ? value : EMPTY_VALUE;

  return (
    <Select
      value={selectValue}
      onValueChange={(v) =>
        onChange(productId, field, v === EMPTY_VALUE ? "" : v)
      }
    >
      <SelectTrigger
        size="sm"
        className="h-7 w-full min-w-[8.5rem] max-w-[14rem] text-xs"
        aria-label={field}
      >
        <SelectValue placeholder="—" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value={EMPTY_VALUE} className="text-xs">
          —
        </SelectItem>
        {options.map((opt) => (
          <SelectItem
            key={`${productId}-${field}-${opt}`}
            value={opt}
            className="text-xs"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ProductTable({
  products,
  dictionaries,
  onFieldChange,
  className,
  scrollClassName,
}: ProductTableProps) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      <div
        className={cn(
          "max-h-[min(70vh,720px)] overflow-auto",
          scrollClassName
        )}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="sticky top-0 z-10 bg-card py-1.5 text-xs font-semibold shadow-[inset_0_-1px_0_0_var(--border)]">
                SKU
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-card py-1.5 text-xs font-semibold shadow-[inset_0_-1px_0_0_var(--border)]">
                Nombre
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-card py-1.5 text-xs font-semibold shadow-[inset_0_-1px_0_0_var(--border)]">
                Categoría
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-card py-1.5 text-xs font-semibold shadow-[inset_0_-1px_0_0_var(--border)]">
                Marca
              </TableHead>
              <TableHead className="sticky top-0 z-10 bg-card py-1.5 text-xs font-semibold shadow-[inset_0_-1px_0_0_var(--border)]">
                Material
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-6 text-center text-xs text-muted-foreground"
                >
                  Sin productos
                </TableCell>
              </TableRow>
            ) : (
              products.map((row) => (
                <TableRow key={row.id} className="text-xs">
                  <TableCell className="max-w-[9rem] truncate py-1.5 font-mono text-[11px]">
                    {row.sku || "—"}
                  </TableCell>
                  <TableCell className="max-w-[14rem] whitespace-normal py-1.5 text-[11px] leading-snug">
                    {row.nombre || "—"}
                  </TableCell>
                  <TableCell className="py-1 align-middle">
                    <DictionarySelect
                      productId={row.id}
                      field="categoria"
                      value={row.categoria}
                      catalog={dictionaries.categorias}
                      onChange={onFieldChange}
                    />
                  </TableCell>
                  <TableCell className="py-1 align-middle">
                    <DictionarySelect
                      productId={row.id}
                      field="marca"
                      value={row.marca}
                      catalog={dictionaries.marcas}
                      onChange={onFieldChange}
                    />
                  </TableCell>
                  <TableCell className="py-1 align-middle">
                    <DictionarySelect
                      productId={row.id}
                      field="material"
                      value={row.material}
                      catalog={dictionaries.materiales}
                      onChange={onFieldChange}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
