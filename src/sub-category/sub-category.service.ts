import { Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategoryRepository } from './sub-category.repository';
import { constants } from 'src/utils/constants.utils';
import { MulterCoreService } from 'src/core/multer/multer-core.service';

@Injectable()
export class SubCategoryService {
  constructor(
    private readonly subCategoryRepository: SubCategoryRepository,
    private readonly multerCoreService: MulterCoreService,
  ) { }
  async create(createSubCategoryDto: CreateSubCategoryDto, file: any) {
    try {
      const category = await this.subCategoryRepository.findOne({ name: createSubCategoryDto.name });
      if (category) {
        throw new Error("Category already exist.");
      }
      if (file.image.length > 0) {
        createSubCategoryDto.image = `${constants.baseImageUrl}/sub-category-image/${file.image[0].filename}`;
      }
      const newSubCategory = await this.subCategoryRepository.create(createSubCategoryDto);
      return {
        success: true,
        message: "Sub category created successfully.",
        data: newSubCategory,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll() {
    try {
      const subCategoryList = await this.subCategoryRepository.find({});
      return {
        success: true,
        message: "Data fetched successfully",
        data: subCategoryList,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(id: string) {
    try {
      const subCategory = await this.subCategoryRepository.findById(id);
      if (!subCategory) {
        throw new Error("Sub category not found.")
      }
      return {
        success: true,
        message: "Data fetched successfully.",
        data: subCategory
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto, file: any) {
    try {
      if (!updateSubCategoryDto.name && !file) {
        throw new Error("Nothing to update!")
      }
      const subCategory = await this.subCategoryRepository.findById(id);
      if (!subCategory) {
        throw new Error("Sub category not found.")
      }
      if (file && file?.image?.length > 0) {
        updateSubCategoryDto.image = `${constants.baseImageUrl}/sub-category-image/${file.image[0].filename}`
      }
      const update = await this.subCategoryRepository.updateOne({ _id: id }, { ...updateSubCategoryDto });
      if (update.modifiedCount && subCategory.image && file?.image?.length > 0) {
        const prevFilename = subCategory.image.split('/').pop();
        await this.multerCoreService.deleteFile(prevFilename, 'sub-category-image')
      }
      return {
        success: true,
        message: "Sub category updated successfully.",
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: string) {
    try {
      const subCategory = await this.subCategoryRepository.findById(id);
      if (!subCategory) {
        throw new Error("Sub category not found");
      }
      if (subCategory.deleted) {
        throw new Error("Sub category already deleted.")
      }
      const res = await this.subCategoryRepository.updateOne({ _id: id }, { deleted: true });
      return {
        success: true,
        message: "Sub category deleted successfully."
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
