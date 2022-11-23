
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length, IsOptional } from "class-validator";

export class CreateProductDto{

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @Length(3, 300)
    @IsString()
    @IsNotEmpty()
    public description!: string;

    @IsNumber()
    @IsNotEmpty()
    public price!: number;

    @IsNumber()
    @IsNotEmpty()
    public priceNotTax!: number;

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

    @IsNumber()
    @IsNotEmpty()
    // @IsOptional()
    public sellerId?: number;

}