import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({
    timestamps: true,
})
export class Brands extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    image: string;

    @Prop({ default: false })
    deleted: boolean;
}
export const BrandSchema = SchemaFactory.createForClass(Brands)