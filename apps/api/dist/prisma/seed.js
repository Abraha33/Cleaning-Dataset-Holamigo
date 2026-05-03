"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() { console.log('🌱 Seed iniciado...'); const b = await prisma.brand.upsert({ where: { name: 'Ecoplast' }, update: {}, create: { name: 'Ecoplast' } }); const c = await prisma.category.upsert({ where: { slug: 'test' }, update: {}, create: { name: 'Test', slug: 'test' } }); console.log('✅ BÚNKER VERIFICADO:', b.name, c.name); }
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map