import { IsEnum, IsNotEmpty, IsString, IsEmail, IsArray, IsDateString } from "class-validator";
import { Gender } from "../schemas/user.schema";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a correct email"})
    readonly email: string;

    @IsNotEmpty()
    @IsEnum(Gender, { message : "Please enter a correct gender"})
    readonly gender: Gender;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsDateString()
    readonly birthdate: string;

    @IsArray()
    readonly preferences: string[];

}