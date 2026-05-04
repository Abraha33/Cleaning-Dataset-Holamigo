import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: Prisma.ProductCreateInput): Promise<{
        id: string;
        sku: string;
        name: string | null;
        rawPayload: Prisma.JsonValue | null;
        rawTitle: string | null;
        rawBody: string | null;
        status: import("@prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
    }>;
    findAll(): Promise<{
        id: string;
        sku: string;
        name: string | null;
        rawPayload: Prisma.JsonValue | null;
        rawTitle: string | null;
        rawBody: string | null;
        status: import("@prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        sku: string;
        name: string | null;
        rawPayload: Prisma.JsonValue | null;
        rawTitle: string | null;
        rawBody: string | null;
        status: import("@prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
    } | null>;
    update(id: string, updateProductDto: Prisma.ProductUpdateInput): Promise<{
        id: string;
        sku: string;
        name: string | null;
        rawPayload: Prisma.JsonValue | null;
        rawTitle: string | null;
        rawBody: string | null;
        status: import("@prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        sku: string;
        name: string | null;
        rawPayload: Prisma.JsonValue | null;
        rawTitle: string | null;
        rawBody: string | null;
        status: import("@prisma/client").$Enums.ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        batchId: string;
    }>;
}
