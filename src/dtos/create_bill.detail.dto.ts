
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateBillDetailDto {
    
    @IsNumber()
    @IsNotEmpty()
    public productId!: number;

    @IsNumber()
    @IsNotEmpty()
    public amount!: number;

    @IsNumber()
    @IsNotEmpty()
    public price!: number;

    @IsNumber()
    @IsNotEmpty()
    public billId!: number;

} 