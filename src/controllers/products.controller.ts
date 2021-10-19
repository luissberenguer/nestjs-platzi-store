import { Controller, Query, Get, Post, Param, Body } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 20,
    @Query('brand') brand: string,
  ) {
    return {
      message: `prducts: limit => ${limit} offset => ${offset} brand => ${brand}`,
    };
  }

  @Get('filter')
  getFilteredProducts() {
    return {
      message: `Yo so un filter`,
    };
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: number) {
    return {
      message: `Este es el producto ${productId}`,
    };
  }

  @Post()
  cretate(@Body() payload: any) {
    return {
      message: 'se ha creado un producto',
      payload,
    };
  }
}
