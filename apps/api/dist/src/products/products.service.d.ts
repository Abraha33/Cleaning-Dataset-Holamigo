import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Promise<{
        id: number;
        name: string;
        sku: string;
        price: Prisma.Decimal;
        attributes: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        brandId: number;
        categoryId: number;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        sku: string;
        price: Prisma.Decimal;
        attributes: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        brandId: number;
        categoryId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        sku: string;
        price: Prisma.Decimal;
        attributes: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        brandId: number;
        categoryId: number;
    } | null>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<{
        id: number;
        name: string;
        sku: string;
        price: Prisma.Decimal;
        attributes: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        brandId: number;
        categoryId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        sku: string;
        price: Prisma.Decimal;
        attributes: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        brandId: number;
        categoryId: number;
    }>;
}
