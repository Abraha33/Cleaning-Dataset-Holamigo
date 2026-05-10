"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { FileSpreadsheet, Loader2, RotateCcw, Upload } from "lucide-react";

import { ProductTable } from "@/components/products/ProductTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductEditableField } from "@/lib/product-types";
import { useProductsStore } from "@/lib/products-store";

export default function ProductsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const products = useProductsStore((s) => s.products);
  const categorias = useProductsStore((s) => s.categorias);
  const marcas = useProductsStore((s) => s.marcas);
  const materiales = useProductsStore((s) => s.materiales);
  const loadError = useProductsStore((s) => s.loadError);
  const loadInfo = useProductsStore((s) => s.loadInfo);
  const isParsing = useProductsStore((s) => s.isParsing);
  const loadFromExcelFile = useProductsStore((s) => s.loadFromExcelFile);
  const loadMock = useProductsStore((s) => s.loadMock);
  const updateProductField = useProductsStore((s) => s.updateProductField);
  const clearMessages = useProductsStore((s) => s.clearMessages);

  const onFieldChange = useCallback(
    (productId: string, field: ProductEditableField, value: string) => {
      updateProductField(productId, field, value);
    },
    [updateProductField]
  );

  const onPickFile = useCallback(() => {
    clearMessages();
    fileRef.current?.click();
  }, [clearMessages]);

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file) return;
      await loadFromExcelFile(file);
    },
    [loadFromExcelFile]
  );

  return (
    <div className="flex min-h-screen flex-col gap-3 bg-muted/30 p-3 font-sans text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <h1 className="text-base font-semibold tracking-tight">
              Productos
            </h1>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {products.length} filas
            </Badge>
            {isParsing ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" />
                Leyendo…
              </span>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            Importación local · edición rápida de categoría, marca y material
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
            <Link href="/">Inicio</Link>
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={onFileChange}
          />
          <Button
            type="button"
            variant="default"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={onPickFile}
            disabled={isParsing}
          >
            <Upload className="size-3.5" />
            Excel
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => {
              clearMessages();
              loadMock();
            }}
            disabled={isParsing}
          >
            <RotateCcw className="size-3.5" />
            Demo
          </Button>
        </div>
      </header>

      {(loadError || loadInfo) && (
        <div
          className={`rounded-md border px-2 py-1.5 text-xs ${
            loadError
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : "border-border bg-card text-muted-foreground"
          }`}
          role="status"
        >
          {loadError ?? loadInfo}
        </div>
      )}

      <Card size="sm" className="min-h-0 flex-1 border-border/80 py-0 shadow-sm">
        <CardHeader className="border-b border-border/60 py-2 [.border-b]:pb-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm">Grilla</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Primera fila del Excel = cabeceras (ej. SKU, Nombre, Categoría, Marca,
            Material). Sin servidor.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col gap-2 px-0 pb-2 pt-0">
          <div className="px-3">
            <ProductTable
              products={products}
              dictionaries={{ categorias, marcas, materiales }}
              onFieldChange={onFieldChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
