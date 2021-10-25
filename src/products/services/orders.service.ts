import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}

  async findAll() {
    return await this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} was not found`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const newOrder =  this.orderRepo.create(payload);
    return this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);
    this.orderRepo.merge(order, changes);
    return this.orderRepo.save(order);
  }

  async delete(id: number) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }
}
