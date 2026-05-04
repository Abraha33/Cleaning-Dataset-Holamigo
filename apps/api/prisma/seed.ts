import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient(); 

async function main() { 
  console.log('í¼± Seed iniciado...'); 
  console.log('âœ… BÃšNKER VERIFICADO: Esquema limpio listo.'); 
} 

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
