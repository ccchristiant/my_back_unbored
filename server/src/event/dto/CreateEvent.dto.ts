import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsDateString,
  ArrayMinSize,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly categories: string[];
}
