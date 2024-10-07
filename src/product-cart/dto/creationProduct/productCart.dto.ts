import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class productDto{
    @IsNotEmpty()
    @IsString()
    productId:string;

    @IsNotEmpty()
    @IsNumber()
    quantity:number;
}