import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dtos';

@Injectable()
export class OrdersService {
  private counter = 1;
  private orders: Order[] = [];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id == id);
    return order;
  }

  create(payload: CreateOrderDto) {
    const newOrder = {
      id: this.counter,
      ...payload,
    };
    this.counter++;
    this.orders.push(newOrder);
    return  newOrder;
  }

  update(id: number, changes: UpdateOrderDto) {
    const order = this.findOne(id);
    if (order) {
      const index = this.orders.findIndex((item) => item.id == id);
      this.orders[index] = {
        ...order,
        ...changes,
      };
      return this.orders[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.orders.findIndex((item) => item.id == id);
    this.orders.splice(index, 1);
    return { message: true };
  }
}
