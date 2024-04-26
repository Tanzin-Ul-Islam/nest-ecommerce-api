import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

interface SortOptions {
    option: string;
    value: string;
}
export class ProductFilterDto {
    @IsNotEmpty()
    page: string;

    @IsNotEmpty()
    productPerPage: string;

    @IsOptional()
    category: string;

    @IsOptional()
    @IsArray({ message: 'Subcategories must be an array' })
    subcategory?: string[];

    @IsOptional()
    @IsArray({ message: 'Brands must be an array' })
    brand: string[];

    @IsOptional()
    searchQuery: string;

    @IsOptional()
    sort: SortOptions

}
