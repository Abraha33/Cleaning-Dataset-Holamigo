import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BatchesModule } from './batches/batches.module'
import { DictionariesModule } from './dictionaries/dictionaries.module'
import { ExportsModule } from './exports/exports.module'
import { PrismaModule } from './prisma/prisma.module'
import { ProceduresModule } from './procedures/procedures.module'
import { ProductsModule } from './products/products.module'
import { StorageModule } from './storage/storage.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    StorageModule,
    ProceduresModule,
    BatchesModule,
    DictionariesModule,
    ExportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
