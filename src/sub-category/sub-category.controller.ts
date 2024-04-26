import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { AdminGuard } from 'src/middleware/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { getMulterConfig } from 'src/config/multer.config';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) { }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 }
    ],
    getMulterConfig('./uploads/sub-category-image')
  ))
  create(@Body() createSubCategoryDto: CreateSubCategoryDto, @UploadedFiles() files: { image?: any }) {
    return this.subCategoryService.create(createSubCategoryDto, files);
  }

  @Get()
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 }
    ],
    getMulterConfig('./uploads/sub-category-image')
  ))
  update(@Param('id') id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto,  @UploadedFiles() files: { image?: any }) {
    return this.subCategoryService.update(id, updateSubCategoryDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
