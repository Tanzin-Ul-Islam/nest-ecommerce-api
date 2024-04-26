import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductFilterService } from './product-filter.service';
import { CreateProductFilterDto } from './dto/create-product-filter.dto';
import { UpdateProductFilterDto } from './dto/update-product-filter.dto';
import { ProductFilterDto } from './dto/product-filter.dto';

@Controller('product-filter')
export class ProductFilterController {
  constructor(private readonly productFilterService: ProductFilterService) {}


  @Post()
  productFilter(@Body() productFilterDto: ProductFilterDto) {
    return this.productFilterService.productFilter(productFilterDto);
  }

}
