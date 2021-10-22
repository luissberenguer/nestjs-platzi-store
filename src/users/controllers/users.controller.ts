import {
  Controller,
  Query,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 20,
    @Query('brand') brand: string,
  ) {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} was not found`);
    }
    return user;
  }

  @Get(':id/orders') //  👈 new endpoint
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  cretate(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
