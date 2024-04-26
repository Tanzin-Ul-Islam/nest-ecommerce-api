import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './entity/users';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async findOne(query: any) {
    return await this.userModel.findOne(query);
  }

  async find(query: any) {
    return await this.userModel.find({...query, deleted: false}).exec();
  }

  async create(data: Record<string, any>) {
    return await this.userModel.create(data);
  }

  async updateOne(query: any, data: Record<string, any>) {
    return await this.userModel.updateOne(query, data);
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
}