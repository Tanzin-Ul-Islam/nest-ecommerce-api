import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { constants } from 'src/utils/constants.utils';
import { generateSlug } from 'src/utils/common.utils';
import { MulterCoreService } from 'src/core/multer/multer-core.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly multerCoreService: MulterCoreService,
  ) { }

  async create(createProductDto: CreateProductDto, file: any) {
    try {
      if (file.image.length > 0) {
        createProductDto.image = `${constants.baseImageUrl}/product-image/${file.image[0].filename}`;
      }
      const slug = generateSlug(createProductDto.name);
      const newProduct = await this.productRepository.create({ ...createProductDto, slug: slug });
      return {
        success: true,
        message: "Product created successfully.",
        data: newProduct,
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const productList = await this.productRepository.find({});
      return {
        success: true,
        message: "Data fetched successfully.",
        data: productList,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(slug: string) {
    try {
      const product = await this.productRepository.findOne({ slug: slug });
      return {
        success: true,
        message: "Data fetched successfully.",
        data: product,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto, file: any) {
    try {
      if ((Object.keys(updateProductDto).length == 0) && !file) {
        throw new Error("Nothing to update!")
      }
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error("Product not found.")
      }
      if (file && file.image.length > 0) {
        updateProductDto.image = `${constants.baseImageUrl}/product-image/${file.image[0].filename}`
      }
      const slug = generateSlug(updateProductDto.name);
      const update = await this.productRepository.updateOne({ _id: id }, { ...updateProductDto, slug: slug });
      if (update.modifiedCount && product.image && file?.image?.length > 0) {
        const prevFilename = product.image.split('/').pop();
        await this.multerCoreService.deleteFile(prevFilename, 'product-image')
      }
      return {
        success: true,
        message: "Product updated successfully.",
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error("Product not found.")
      }
      if (product.deleted) {
        throw new Error("Product already deleted.")
      }
      const res = await this.productRepository.updateOne({ _id: id }, { deleted: true });
      return {
        success: true,
        message: "Product deleted successfully."
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
