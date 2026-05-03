import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  constructor() {
    const url = "postgresql://user:password@localhost:5435/product_data_platform";
    const poolInstance = new Pool({ connectionString: url });
    super({ adapter: new PrismaPg(poolInstance) });
    this.pool = poolInstance;
  }
  async onModuleInit() { await this.$connect(); }
  async onModuleDestroy() { 
    await this.$disconnect(); 
    await this.pool.end(); 
  }
}