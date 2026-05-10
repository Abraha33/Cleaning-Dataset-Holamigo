import { PrismaClient, ProductStatus, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const BCRYPT_ROUNDS = 12

async function main() {
  console.log('Seed iniciado...')

  const demoEmail = 'admin@pdp.local'
  const demoPassword = 'admin123'

  const passwordHash = await bcrypt.hash(demoPassword, BCRYPT_ROUNDS)
  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      passwordHash,
      role: Role.ADMIN,
      name: 'Admin Demo',
    },
    create: {
      email: demoEmail,
      passwordHash,
      role: Role.ADMIN,
      name: 'Admin Demo',
    },
    select: { id: true, email: true, role: true },
  })

  const batchName = 'Seed Demo Batch'
  const existingBatch = await prisma.batch.findFirst({
    where: { name: batchName },
    select: { id: true, name: true },
  })

  const batch = existingBatch
    ? await prisma.batch.update({
        where: { id: existingBatch.id },
        data: {
          name: batchName,
          description: 'Datos de demo para Swagger',
          category: 'demo',
        },
        select: { id: true, name: true },
      })
    : await prisma.batch.create({
        data: {
          name: batchName,
          description: 'Datos de demo para Swagger',
          category: 'demo',
        },
        select: { id: true, name: true },
      })

  const demoProducts = [
    { sku: 'BOLSA-DEMO-001', name: 'Bolsa kraft demo' },
    { sku: 'CONTENEDOR-DEMO-001', name: 'Contenedor plastico demo' },
    { sku: 'VASO-DEMO-001', name: 'Vaso biodegradable demo' },
  ]

  for (const p of demoProducts) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        batchId: batch.id,
        status: ProductStatus.APPROVED,
      },
      create: {
        sku: p.sku,
        name: p.name,
        batchId: batch.id,
        status: ProductStatus.APPROVED,
      },
    })
  }

  console.log('Seed completado.')
  console.log(`Usuario demo: ${demoEmail}`)
  console.log(`Password demo: ${demoPassword}`)
  console.log(`Batch: ${batch.name}`)
  console.log(`Productos: ${demoProducts.length}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
