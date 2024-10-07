import { Type } from "class-transformer";
import { IsArray, IsNotEmpty } from "class-validator";
import { productDto } from "./creationProduct/productCart.dto";

export class CreateProductCartDto {

    @IsNotEmpty()
    @IsArray()
    @Type(()=>productDto)
    products:productDto[];
}
