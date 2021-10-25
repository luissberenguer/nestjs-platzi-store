import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async findAll() {
    return await this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} was not found`);
    }
    return brand;
  }

  async create(payload: CreateBrandDto) {
    const newBrand = this.brandRepo.create(payload);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  async delete(id: number) {
    const brand = await this.findOne(id);
    return this.brandRepo.remove(brand);
  }
}
