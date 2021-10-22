import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counter = 1;
  private categories: Category[] = [];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id == id);
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = {
      id: this.counter,
      ...payload,
    };
    this.counter++;
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, changes: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.findIndex((item) => item.id == id);
      this.categories[index] = {
        ...category,
        ...changes,
      };
      return this.categories[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id == id);
    this.categories.splice(index, 1);
    return { message: true };
  }
}
