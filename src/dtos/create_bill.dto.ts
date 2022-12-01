
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length, IsDate, IsBoolean, IsOptional } from "class-validator";

export class CreateBillDto {
  
    @IsString()
    @IsNotEmpty()
    public date!: string;

    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    public tax!: number;

    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    public discount!: number;

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public paymentForm!: string;

    @IsNumber()
    @IsNotEmpty()
    public userId!: number;

} 
