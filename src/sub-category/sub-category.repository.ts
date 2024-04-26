import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SubCategory } from "./entities/sub-category.entity";
import { Model } from "mongoose";

@Injectable()
export class SubCategoryRepository {
    constructor(
        @InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategory>
    ) { }
    async findOne(query: any) {
        return await this.subCategoryModel.findOne(query);
    }

    async find(query: any) {
        return await this.subCategoryModel.find({ ...query, deleted: false }).populate({path:'category', select: 'id name'}).exec();
    }

    async create(data: Record<string, any>) {
        return await this.subCategoryModel.create(data);
    }

    async updateOne(query: any, data: Record<string, any>) {
        return await this.subCategoryModel.updateOne(query, data);
    }

    async updateMany(query: any, data: Record<string, any>) {
        return await this.subCategoryModel.updateMany(query, data);
    }

    async findById(id: string) {
        return await this.subCategoryModel.findById(id).populate({path:'category', select: 'id, name'}).exec();
    }
}