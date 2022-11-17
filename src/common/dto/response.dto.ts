
import { IsNumber, IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class ResponseDto {

    @IsNumber()
    @IsNotEmpty()
    public code?: number;

    @IsString()
    @IsNotEmpty()
    public message?: string;
    
    @IsNumber()
    @IsOptional()
    public count?: number;

    @IsObject()
    @IsOptional()
    public results?: {};

}
