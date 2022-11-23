
import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateListProductsDto {

    @IsNumber()
    @IsNotEmpty()
    public billDetailId!: number;

    @IsNumber()
    @IsNotEmpty()
    public productId!: number;

    @IsNumber()
    @IsNotEmpty()
    public amount!: number;

}
