import { PrismaClient } from '@prisma/client';
async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('? Conexión exitosa a PostgreSQL en puerto 5435');
  } catch (e) {
    console.error('? Error de conexión:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
void void main();
