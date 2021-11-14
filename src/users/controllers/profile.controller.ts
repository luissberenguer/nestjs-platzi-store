import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { Role } from '../../auth/models/roles.model';
import { OrdersService } from '../services/orders.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PayloadToken } from '../../auth/models/token.model';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.ordersService.findOne(user.sub);
  }
}
