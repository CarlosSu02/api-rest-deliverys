
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class SignupUserDto {

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

    @Length(3, 100)
    @IsEmail()
    @IsNotEmpty()
    public email!: string;

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public password!: string;

    @Length(3, 100)
    @IsString()
    @IsNotEmpty()
    public confirm_password!: string;

    @IsNumber()
    @IsNotEmpty()
    public roleId!: number;

} 
