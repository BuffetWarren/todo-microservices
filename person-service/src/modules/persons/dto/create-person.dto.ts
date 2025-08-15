import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";

export class CreatePersonDto {
    @IsNotEmpty()
    @IsString()
    @Min(3)
    @IsString()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}