import { Controller, Query, Get, Post, Param, Body } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 20,
    @Query('brand') brand: string,
  ) {
    return {
      message: `prducts: limit => ${limit} offset => ${offset} brand => ${brand}`,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return {
      message: `Este es el producto ${id}`,
    };
  }

  @Get(':id/products/:productId')
  getCategoryProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return {
      message: `prduct ${productId} and category ${id}`,
    };
  }

  @Post()
  cretate(@Body() payload: any) {
    return {
      message: 'Se ha creado un usuario',
      payload,
    };
  }
}
