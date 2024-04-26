import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) { }

    async findOne(query: any) {
        return await this.productModel.findOne(query).populate([{ path: 'category', select: 'id name' }, { path: 'subCategory', select: 'id name' }, { path: 'brand', select: 'id name' }]).exec();
    }

    async find(query: any) {
        return await this.productModel.find({ ...query, deleted: false }).populate([{ path: 'category', select: 'id name' }, { path: 'subCategory', select: 'id name' }, { path: 'brand', select: 'id name' }]).exec();
    }

    async create(data: Record<string, any>) {
        return await this.productModel.create(data);
    }

    async updateOne(query: any, data: Record<string, any>) {
        return await this.productModel.updateOne(query, data);
    }

    async findById(id: string) {
        return await this.productModel.findById(id);
    }

    async productFilter(aggregationPipeline: any, totalCountPipeline: any) {
        return await this.productModel.aggregate([
            {
                $facet:{
                    products: aggregationPipeline,
                    totalProductCount: totalCountPipeline,
                }
            }
        ]).exec();
    }
}