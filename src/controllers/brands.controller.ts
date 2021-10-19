import {
  Controller,
  Query,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('brands')
export class BrandsController {
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

  @Post()
  cretate(@Body() payload: any) {
    return {
      message: 'Se ha creado un usuario',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
      message: `Deleted`,
    };
  }
}
