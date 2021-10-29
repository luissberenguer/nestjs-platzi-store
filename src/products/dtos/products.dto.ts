import {
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  IsNotEmpty,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty({ description: 'Product prices, must be positive' })
  readonly price: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  readonly stock: number;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly brandId: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  readonly offset: number;

  @IsOptional()
  @IsPositive()
  readonly minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  readonly maxPrice: number;
}
