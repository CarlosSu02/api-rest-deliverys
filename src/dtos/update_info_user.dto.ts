
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length, IsOptional } from "class-validator";

export class UpdateInfoUserDto {

    @Length(3, 50)
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    public name!: string;
    
    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    public phone!: number;

    @Length(3, 100)
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    public address!: string;

    @IsNumber()
    // @IsNotEmpty()
    @IsOptional()
    public roleId!: number;

} 
