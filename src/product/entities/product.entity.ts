import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { SubCategory } from "src/sub-category/entities/sub-category.entity";
import { Brands } from "src/brands/entities/brand.entity";
import { Users } from "src/users/entity/users";
@Schema({
    timestamps: true,
})

export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    image: string;

    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: string;

    @Prop({ type: Types.ObjectId, ref: 'SubCategory', required: true })
    subCategory: string;

    @Prop({ type: Types.ObjectId, ref: 'Brands', required: true })
    brand: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: false, default: null })
    discount: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: false, default: 5 })
    rating: number;

    @Prop({
        type: [{
            userId: { type: Types.ObjectId, ref: "Users", required: true },
            review: { type: String, required: true }
        }], required: false, default: []
    })
    review: Array<{ userId: string | Users; review: string }>

    @Prop({ required: false, default: 0 })
    purchaseCount: number;

    @Prop({ required: false, default: false })
    deleted: boolean;

}
export const ProductSchema = SchemaFactory.createForClass(Product);