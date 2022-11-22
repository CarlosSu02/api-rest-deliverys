
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateIngredientDto{

    @Length(3, 50)
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @IsNumber()
    public amount!: number;

    @IsNumber()
    public unit_measure!: number;

    @IsNumber()
    public cost!: number;

    @IsNumber()
    public stock!: number;

} 