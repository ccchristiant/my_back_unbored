import { IsEnum, IsNotEmpty, IsString, IsDate, IsEmail, IsArray } from "class-validator";
import { Gender } from "../schemas/user.schema";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a correct email"})
    readonly email: string;

    @IsNotEmpty()
    @IsEnum(Gender, { message : "Please :'("})
    readonly gender: Gender;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsDate()
    readonly birthdate: string;

    @IsArray()
    readonly preferences: string[];

}