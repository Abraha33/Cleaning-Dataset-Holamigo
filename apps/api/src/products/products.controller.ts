import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly ps: ProductsService) {}
  @Post() create(@Body() d: any) {
    return this.ps.create(d);
  }
  @Get() findAll() {
    return this.ps.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.ps.findOne(+id);
  }
  @Patch(':id') update(@Param('id') id: string, @Body() d: any) {
    return this.ps.update(+id, d);
  }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.ps.remove(+id);
  }
}
