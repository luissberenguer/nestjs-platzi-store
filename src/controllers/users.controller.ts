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

import { ParseIntPipe } from '../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 20,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    const user = this.userService.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Product #${productId} was not found`);
    }
    return product;
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
