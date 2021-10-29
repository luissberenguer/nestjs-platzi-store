import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  readonly orderId: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  readonly productId: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateItemDto extends PartialType(CreateItemDto) {}
