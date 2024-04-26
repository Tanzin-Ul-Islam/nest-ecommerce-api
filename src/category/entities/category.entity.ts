import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({
    timestamps: true,
})
export class Category extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: false, default: null})
    image: string;

    @Prop({default: false})
    deleted: boolean;

}
export const CategorySchema = SchemaFactory.createForClass(Category)