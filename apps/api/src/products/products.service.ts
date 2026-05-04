import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

const productInclude = {
  batch: true,
  images: {
    orderBy: { sortOrder: 'asc' as const },
  },
} satisfies Prisma.ProductInclude

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: typeof productInclude
}>

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({
      data,
      include: productInclude,
    })
  }

  findAll(): Promise<ProductWithRelations[]> {
    return this.prisma.product.findMany({
      include: productInclude,
      orderBy: { updatedAt: 'desc' },
    })
  }

  findOne(id: string): Promise<ProductWithRelations | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: productInclude,
    })
  }

  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: productInclude,
    })
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
      include: productInclude,
    })
  }
}
