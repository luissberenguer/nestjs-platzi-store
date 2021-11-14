import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} was not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      if (!customer) {
        throw new NotFoundException(
          `Customer #${data.customerId} was not found`,
        );
      }
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} was not found`);
    }
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne(changes.customerId);
      if (!customer) {
        throw new NotFoundException(
          `Customer #${changes.customerId} was not found`,
        );
      }
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }

  ordersByCustomer(customerId: number) {
    return this.orderRepo.find({
      where: {
        customer: customerId,
      },
    });
  }
}
