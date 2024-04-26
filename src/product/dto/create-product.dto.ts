import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    image: string

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    subCategory: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    discount: string;

    @IsNotEmpty()
    quantity: number;

}
