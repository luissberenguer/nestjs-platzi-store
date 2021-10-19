import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [
    {
      id: 0,
      name: 'Libro ciencia',
      description: 'Nos cuenta sobre la física cuántica y la materia oscura',
      price: 20,
      stock: 100,
      image: 'http://image.com',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    return product;
  }

  create(body) {
    const payload = {
      id: this.counter,
      ...body,
    };
    this.counter++;
    this.products.push(payload);
    return {
      message: 'Product created',
      payload,
    };
  }

  update(id: number, changes: any) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id == id);
      this.products[index] = {
        ...product,
        ...changes,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id == id);
    this.products.splice(index, 1);
    return { message: 'Product deleted' };
  }

}
