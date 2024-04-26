import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) { }

  async findOne(query: any) {
    return await this.categoryModel.findOne(query);
  }

  async find(query: any) {
    return await this.categoryModel.find({ ...query, deleted: false }).exec();
  }

  async create(data: Record<string, any>) {
    return await this.categoryModel.create(data);
  }

  async updateOne(query: any, data: Record<string, any>) {
    return await this.categoryModel.updateOne(query, data);
  }

  async findById(id: string) {
    return await this.categoryModel.findById(id);
  }
}