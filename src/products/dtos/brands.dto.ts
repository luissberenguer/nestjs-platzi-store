import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
