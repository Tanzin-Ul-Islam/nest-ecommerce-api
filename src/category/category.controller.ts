import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminGuard } from 'src/middleware/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer.config';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 }
    ],
    getMulterConfig('./uploads/category-image')
  ))
  create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFiles() files: { image?: any }) {
    return this.categoryService.create(createCategoryDto, files);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 }
    ],
    getMulterConfig('./uploads/category-image')
  ))
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFiles() files: { image?: any }) {
    
    return this.categoryService.update(id, updateCategoryDto, files);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
