import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} was not found`);
    }
    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newCustomer = await this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async delete(id: number) {
    const customer = await this.findOne(id);
    return this.customerRepo.remove(customer);
  }
}
