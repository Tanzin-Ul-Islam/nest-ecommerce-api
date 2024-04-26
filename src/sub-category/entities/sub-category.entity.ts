import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "src/category/entities/category.entity";
@Schema({
    timestamps: true,
})
export class SubCategory  extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: false})
    image: string;

    @Prop({type: Types.ObjectId, ref: 'Category', required: true})
    category: Category;

    @Prop({required: false, default: false})
    deleted: boolean;

}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory)
