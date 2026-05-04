import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductsModule } from './products/products.module';
import { StorageModule } from './storage/storage.module';
import { ProceduresModule } from './procedures/procedures.module';

@Module({
  imports: [ProductsModule, StorageModule, ProceduresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
