import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
