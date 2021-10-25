import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} was not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.description = payload.description;
    // newProduct.image = payload.image;
    // newProduct.price = payload.price;
    // newProduct.name = payload.name;
    // newProduct.stock = payload.stock;
    const newProduct = this.productRepo.create(payload);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async delete(id) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);

  }
}
