
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class SigninUserDto {
    
    @Length(3, 100)
    @IsEmail()
    @IsNotEmpty()
    public email!: string;

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public password!: string;

} 
