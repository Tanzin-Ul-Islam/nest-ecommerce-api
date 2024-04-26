import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Users } from "src/users/entity/users";
@Schema({
    timestamps: true,
})
export class ShippingAddress {
    @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
    user: Users;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phoneNo: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    postCode: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: false, default: false })
    deleted: boolean;
}
export const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress)