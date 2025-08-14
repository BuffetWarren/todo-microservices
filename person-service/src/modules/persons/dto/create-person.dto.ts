import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePersonDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}