import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
