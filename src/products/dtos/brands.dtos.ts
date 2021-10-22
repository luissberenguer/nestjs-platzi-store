import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
