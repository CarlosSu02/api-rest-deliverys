
import { IsString, IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateRoleDto {
    
    @Length(3, 50)
    @IsString()
    @IsNotEmpty()
    public type!: string;

} 
