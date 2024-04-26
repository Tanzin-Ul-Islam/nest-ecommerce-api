import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateSubCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    category: string;
}
