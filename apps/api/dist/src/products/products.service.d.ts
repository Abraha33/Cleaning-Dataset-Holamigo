import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, data: Prisma.ProductUpdateInput): Promise<{
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
    remove(id: number): Promise<{
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
