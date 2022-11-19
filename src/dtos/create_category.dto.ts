
import { IsString, IsNotEmpty, Length } from "class-validator";

export class CreateCategoryDto {

    @Length(10, 200)
    @IsString()
    @IsNotEmpty()
    public description!: string;

} 
