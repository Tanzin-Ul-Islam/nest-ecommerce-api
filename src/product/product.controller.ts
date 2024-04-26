import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from 'src/middleware/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer.config';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [{ name: "image", maxCount: 1 }],
    getMulterConfig('./uploads/product-image')
  ))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files: { image?: any }) {
    return this.productService.create(createProductDto, files);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.productService.findOne(slug);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [{ name: "image", maxCount: 1 }],
    getMulterConfig('./uploads/product-image')
  ))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files: { image?: any }) {
    return this.productService.update(id, updateProductDto, files);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
