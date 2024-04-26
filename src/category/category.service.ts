import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { constants } from 'src/utils/constants.utils';
import { MulterCoreService } from 'src/core/multer/multer-core.service';
import { SubCategoryRepository } from 'src/sub-category/sub-category.repository';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly subCategoryRepository: SubCategoryRepository,
    private readonly multerCoreService: MulterCoreService,
  ) { }
  async create(createCategoryDto: CreateCategoryDto, file: any) {
    try {
      const category = await this.categoryRepository.findOne({ name: createCategoryDto.name });
      if (category) {
        throw new Error("Category already exist.");
      }
      if (file.image.length > 0) {
        createCategoryDto.image = `${constants.baseImageUrl}/category-image/${file.image[0].filename}`;
      }
      const newCategory = await this.categoryRepository.create(createCategoryDto);
      return {
        success: true,
        message: "Category created successfully.",
        data: newCategory,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      const res = await this.categoryRepository.find({});
      return {
        success: true,
        message: "Data fetched successfully.",
        data: res,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new Error("Category not found.");
      }
      return {
        success: true,
        message: "Data fetched successfully.",
        data: category,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file: any) {
    try {
      if (!updateCategoryDto.name && !file) {
        throw new Error("Nothing to update!")
      }
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new Error("Category not found.")
      }
      if (file && file?.image?.length > 0) {
        updateCategoryDto.image = `${constants.baseImageUrl}/category-image/${file.image[0].filename}`
      }
      const update = await this.categoryRepository.updateOne({ _id: id }, { ...updateCategoryDto });
      if (update.modifiedCount && category.image && file?.image?.length > 0) {
        const prevFilename = category.image.split('/').pop();
        await this.multerCoreService.deleteFile(prevFilename, 'category-image')
      }
      return {
        success: true,
        message: "Category updated successfully.",
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new Error("Category not found.")
      }
      if (category.deleted) {
        throw new Error("Category already deleted");
      }
      const res = await this.categoryRepository.updateOne({ _id: id }, { deleted: true });
      await this.subCategoryRepository.updateMany({ category: id }, { $set: { category: null, deleted: true } })
      return {
        success: true,
        message: "Category deleted successfully."
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
