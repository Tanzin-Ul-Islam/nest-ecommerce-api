import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandsRepository } from './brands.repository';
import { constants } from 'src/utils/constants.utils';
import { MulterCoreService } from 'src/core/multer/multer-core.service';
import * as url from 'url';
import { join } from 'path';
@Injectable()
export class BrandsService {
  constructor(
    private readonly brandRepository: BrandsRepository,
    private readonly multerCoreService: MulterCoreService
  ) { }
  async create(createBrandDto: CreateBrandDto, file: any) {
    try {
      const { name, image } = createBrandDto;
      let fileName = "";
      const brand = await this.brandRepository.findOne({ name: name });
      if (brand) {
        throw new Error("Brand already exist.");
      }
      if (file.image.length > 0) {
        fileName = file.image[0].filename;
      }
      const payload = {
        name: name,
        image: `${constants.baseImageUrl}/brand-image/${fileName}`,
      }
      const newBrand = await this.brandRepository.create(payload);
      return {
        success: true,
        message: "Brand created successfully.",
        data: newBrand,
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.brandRepository.findAll({});
  }

  async findOne(id: string) {
    return await this.brandRepository.findOne({ _id: id });
  }

  async update(id: string, updateBrandDto: UpdateBrandDto, file: any) {
    if (!updateBrandDto.name && !file) {
      throw new Error("Nothing to update!")
    }
    let fileName = "";
    let brandValueBeforeUpdate = undefined;
    if (file?.image?.length > 0) {
      fileName = file.image[0].filename;
      updateBrandDto.image = `${constants.baseImageUrl}/brand-image/${fileName}`;
      brandValueBeforeUpdate = await this.brandRepository.findOne({ _id: id });
    }
    const result = await this.brandRepository.updateOne({ _id: id }, updateBrandDto);
    if (result.modifiedCount && brandValueBeforeUpdate.image) {
      const prevFilename = brandValueBeforeUpdate.image.split('/').pop();
      await this.multerCoreService.deleteFile(prevFilename, "brand-image");
    }
    return {
      success: true,
      message: "Brand updated successfully."
    }
  }

  async remove(id: string) {
    try {
      const brand = await this.brandRepository.findById(id);
      if (!brand) {
        throw new Error("Brand not found.")
      }
      if (brand.deleted) {
        throw new Error("Brand already deleted");
      }
      const res = await this.brandRepository.updateOne({ _id: id }, { deleted: true });
      return {
        success: true,
        message: "Brand deleted successfully."
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
