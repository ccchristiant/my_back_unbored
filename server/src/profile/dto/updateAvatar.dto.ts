import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateAvatarDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly actualH: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly actualB: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly actualP: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly actualS: string;
}
