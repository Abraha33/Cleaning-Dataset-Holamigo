import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Connection failed:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

void main();
