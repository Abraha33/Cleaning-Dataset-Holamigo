import { Module } from '@nestjs/common';
import { ProceduresController } from './procedures.controller';
import { ProceduresService } from './procedures.service';
import { ProceduresService } from './procedures.service';
import { ProceduresController } from './procedures.controller';

@Module({
  controllers: [ProceduresController],
  providers: [ProceduresService]
})
export class ProceduresModule {}
