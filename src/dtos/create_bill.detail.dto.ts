
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBillDetailDto {

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