import { IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
