import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer.config';
import { AdminGuard } from 'src/middleware/guards/admin.guard';
@Controller('brands')
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService
  ) { }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 },
    ],
    getMulterConfig('./uploads/brand-image')
  ))
  create(@Body() createBrandDto: CreateBrandDto, @UploadedFiles() files: {
    image?: any
  },) {
    return this.brandsService.create(createBrandDto, files);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 },
    ],
    getMulterConfig('./uploads/brand-image')
  ))
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @UploadedFiles() file: { image?: any }) {
    return this.brandsService.update(id, updateBrandDto, file);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
