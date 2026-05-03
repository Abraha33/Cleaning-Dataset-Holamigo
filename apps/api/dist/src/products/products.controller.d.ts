import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: Prisma.ProductCreateInput): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateProductDto: Prisma.ProductUpdateInput): Promise<{
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
    remove(id: string): Promise<{
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
