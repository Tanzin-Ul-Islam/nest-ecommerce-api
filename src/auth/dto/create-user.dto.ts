import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userTypes } from "src/users/entity/users";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsIn([userTypes.ADMIN, userTypes.CUSTOMER])
    type: string;

    @IsOptional()
    @IsString()
    secretToken?: string;

    @IsOptional()
    isVerified?: boolean;
}
