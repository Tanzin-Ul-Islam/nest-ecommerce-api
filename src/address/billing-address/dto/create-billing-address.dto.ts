import { IsNotEmpty } from "class-validator";

export class CreateBillingAddressDto {
    @IsNotEmpty()
    user:string;

    @IsNotEmpty()
    name:string;
    
    @IsNotEmpty()
    phoneNo:string;
    
    @IsNotEmpty()
    email:string;
    
    @IsNotEmpty()
    city:string;
    
    @IsNotEmpty()
    postCode:string;
    
    @IsNotEmpty()
    address:string;
    
}
