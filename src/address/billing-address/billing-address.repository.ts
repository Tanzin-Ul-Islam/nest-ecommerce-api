import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BillingAddress } from "./entities/billing-address.entity";
import { Model } from "mongoose";

@Injectable()
export class BillingAddressRepository {
    constructor(
        @InjectModel(BillingAddress.name) private readonly billingAddressModel: Model<BillingAddress>
    ) { }

    async findById(id: string) {
        return await this.billingAddressModel.findById(id).populate([{path:'user', select: '_id name email'}]);
    }

    async findByUserId(id: string) {
        return await this.billingAddressModel.find({
            user: id
        }).populate([{ path: 'user', select: '_id name email' }]).exec();
    }

    async create(data: Record<string, any>) {
        return await this.billingAddressModel.create(data);
    }

    async updateOne(query: any, data: Record<string, any>) {
        return await this.billingAddressModel.updateOne(query, data);
    }
}