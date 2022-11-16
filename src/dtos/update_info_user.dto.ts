
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class UpdateInfoUserDto {

    @Length(3, 50)
    @IsString()
    @IsNotEmpty()
    public name!: string;
    
    @IsNumber()
    @IsNotEmpty()
    public phone!: number;

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public address!: string;

    @IsNumber()
    @IsNotEmpty()
    public roleId!: number;

} 
