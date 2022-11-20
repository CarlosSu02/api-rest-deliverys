
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto{

    @Length(3, 50)
    @IsString()
    @IsNotEmpty()
    public description!: string;

    @IsNumber()
    @IsNotEmpty()
    public price!: number;

    @IsNumber()
    @IsNotEmpty()
    public priceNotTax!: number;

    @IsNumber()
    @IsNotEmpty()
    public totalPrice!: number;

    @IsBoolean()
    @IsNotEmpty()
    public isElaborate!: boolean;

    @IsNumber()
    @IsNotEmpty()
    public stock!: number;

    @Length(4, 30)
    @IsString()
    @IsNotEmpty()
    public size!: string;

    @IsNumber()
    @IsNotEmpty()
    public categoryId!: number;

}