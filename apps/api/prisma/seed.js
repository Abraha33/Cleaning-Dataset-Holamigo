const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.brand.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "Ecoplast" },
  });
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "General", slug: "general" },
  });
  console.log("✅ Seed completado: Marca y Categoría creadas.");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
