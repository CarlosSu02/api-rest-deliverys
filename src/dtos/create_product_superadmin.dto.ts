
import { IsNotEmpty, IsEmail, Length } from "class-validator";
import { CreateProductDto } from "./create_product.dto";

export class CreateProductSuperadminDto extends CreateProductDto {

    @Length(3, 100)
    @IsEmail()
    @IsNotEmpty()
    public sellerEmail!: string;

}