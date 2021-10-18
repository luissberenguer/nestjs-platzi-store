import { Controller, Query, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 20,
    @Query('brand') brand: string,
  ) {
    return `prducts: limit => ${limit} offset => ${offset} brand => ${brand}`;
  }
}
