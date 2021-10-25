import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { Client } from 'pg';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('PG') private clientPg: Client,
  ) {}
  private counter = 1;
  private users: User[] = [
    {
      id: 0,
      username: 'luissberenguer',
      password: 'luis1234',
      email: 'luis@gmail.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id == id);
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: this.counter,
      ...payload,
    };
    this.counter++;
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id == id);
      this.users[index] = {
        ...user,
        ...changes,
      };
      return this.users[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id == id);
    this.users.splice(index, 1);
    return { message: true };
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
