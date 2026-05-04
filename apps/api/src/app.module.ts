import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BatchesModule } from './batches/batches.module'
import { DictionariesModule } from './dictionaries/dictionaries.module'
import { ExportsModule } from './exports/exports.module'
import { PrismaService } from './prisma/prisma.service'
import { ProceduresModule } from './procedures/procedures.module'
import { ProductsModule } from './products/products.module'
import { StorageModule } from './storage/storage.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ProductsModule,
    StorageModule,
    ProceduresModule,
    AuthModule,
    UsersModule,
    BatchesModule,
    DictionariesModule,
    ExportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
