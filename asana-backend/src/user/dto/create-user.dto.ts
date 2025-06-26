
import { IsArray, IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string
    
    @IsString()
    password: string

    @IsEmail()
    email: string

    @IsEnum(['admin', 'user', 'team-lead'], { message: 'gender must be m, f or u' })
    role: string;

    @IsInt()
    orgID:number

    
   
}