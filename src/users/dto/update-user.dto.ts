import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    name: string;

    @IsOptional()
    image: string;
}
