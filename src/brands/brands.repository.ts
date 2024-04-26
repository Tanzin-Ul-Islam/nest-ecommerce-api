import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Brands } from "./entities/brand.entity";
import { Model } from "mongoose";

@Injectable()
export class BrandsRepository {
    constructor(
        @InjectModel(Brands.name) private readonly BrandModel: Model<Brands>
    ) { }
    async findOne(query: any) {
        return await this.BrandModel.findOne(query);
    }
    async findAll(query: any) {
        return await this.BrandModel.find({...query, deleted: false}).exec();
    }
    async create(data: Record<string, any>) {
        return await this.BrandModel.create(data);
    }
    async updateOne(query: any, data: Record<string, any>) {
        return await this.BrandModel.updateOne(query, data);
    }
    async findById(id: string) {
        return await this.BrandModel.findById(id);
    }
    async deleteById(id: string) {
        return await this.BrandModel.findOneAndDelete({ _id: id })
    }
}