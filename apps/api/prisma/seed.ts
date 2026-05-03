import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const brand = await prisma.brand.upsert({
    where: { name: 'Ecoplast' },
    update: {},
    create: { name: 'Ecoplast' },
  });

  const category = await prisma.category.upsert({
    where: { slug: 'hogar-limpieza' },
    update: {},
    create: {
      name: 'Hogar y Limpieza',
      slug: 'hogar-limpieza',
    },
  });

  console.log({ brand, category });
  console.log('✅ Seed finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
