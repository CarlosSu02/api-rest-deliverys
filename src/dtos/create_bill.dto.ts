
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length, IsDate, IsBoolean } from "class-validator";

export class CreateBillDto {
  
    @IsString()
    @IsNotEmpty()
    public date!: string;

    @IsNumber()
    @IsNotEmpty()
    public tax!: number;

    @IsNumber()
    @IsNotEmpty()
    public discount!: number;

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public paymentForm!: string;

    @IsNumber()
    @IsNotEmpty()
    public userId!: number;

} 
