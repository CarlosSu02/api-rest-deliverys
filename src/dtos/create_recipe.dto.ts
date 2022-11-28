
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRecipeDto{

    @IsNumber()
    @IsNotEmpty()
    public ingredientId!: number;

    @IsNumber()
    @IsNotEmpty()
    public productId!: number;

} 