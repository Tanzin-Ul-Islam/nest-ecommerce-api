import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ShippingAddress } from "./entities/shipping-address.entity";

@Injectable()
export class ShippingAddressRepository {
    constructor(
        @InjectModel(ShippingAddress.name) private readonly shippingAddressModel: Model<ShippingAddress>
    ) { }

    async findById(id: string) {
        return await this.shippingAddressModel.findById(id).populate([{path:'user', select: '_id name email'}]);
    }

    async findByUserId(id: string) {
        return await this.shippingAddressModel.find({
            user: id
        }).populate([{ path: 'user', select: '_id name email' }]).exec();
    }

    async create(data: Record<string, any>) {
        return await this.shippingAddressModel.create(data);
    }

    async updateOne(query: any, data: Record<string, any>) {
        return await this.shippingAddressModel.updateOne(query, data);
    }
}