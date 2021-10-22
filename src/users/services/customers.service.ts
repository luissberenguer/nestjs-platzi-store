import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counter = 1;
  private customers: Customer[] = [];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id == id);
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = {
      id: this.counter,
      ...payload,
    };
    this.counter++;
    this.customers.push(newCustomer);
    return  newCustomer;
  }

  update(id: number, changes: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id == id);
      this.customers[index] = {
        ...customer,
        ...changes,
      };
      return this.customers[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id == id);
    this.customers.splice(index, 1);
    return { message: true };
  }
}
