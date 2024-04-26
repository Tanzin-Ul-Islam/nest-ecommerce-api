import { Injectable } from '@nestjs/common';
import { CreateProductFilterDto } from './dto/create-product-filter.dto';
import { UpdateProductFilterDto } from './dto/update-product-filter.dto';
import { ProductRepository } from 'src/product/product.repository';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductFilterService {
  constructor(private readonly productRepository: ProductRepository) { }

  async productFilter(productFilterDto: ProductFilterDto) {
    try {
      const {
        page,
        productPerPage,
        category,
        subcategory,
        brand,
        searchQuery,
        sort: sortOption
      }: ProductFilterDto = productFilterDto;

      const aggregationPipeline = [];
      aggregationPipeline.push({
        $match: {
          ...(category && { category: category }),
          ...((subcategory && subcategory.length > 0) && { subcategory: { $in: subcategory } }),
          ...((brand && brand.length > 0) && { brand: { $in: brand } }),
        }
      });
      aggregationPipeline.push({
        $sort: { [sortOption.option]: sortOption.value === 'asc' ? 1 : -1 }
      })
      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, 'i');
        aggregationPipeline.push({
          $match: {
            $or: [
              { name: { $regex: searchRegex } },
            ],
          },
        });
      }

      const pageNo = parseInt(page);
      const productLimit = parseInt(productPerPage);
      aggregationPipeline.push({
        $skip: (pageNo - 1) * productLimit,
      });
      aggregationPipeline.push({
        $limit: productLimit,
      });
      const totalCountPipeline = [...aggregationPipeline];
      totalCountPipeline.push({
        $count: 'totalProducts',
      });
      const res = await this.productRepository.productFilter(aggregationPipeline, totalCountPipeline);
      const data = res.length > 0 ? res[0] : []
      return {
        success: true,
        message: "Data fetched successfully.",
        data: data,
      }
    } catch (error) {
      throw new Error(error)
    }
  }

}
