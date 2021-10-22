import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  private counter = 1;
  private brands: Brand[] = [];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id == id);
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = {
      id: this.counter,
      ...payload,
    };
    this.counter++;
    this.brands.push(newBrand);
    return  newBrand;
  }

  update(id: number, changes: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id == id);
      this.brands[index] = {
        ...brand,
        ...changes,
      };
      return this.brands[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id == id);
    this.brands.splice(index, 1);
    return { message: true };
  }
}
