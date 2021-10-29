import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, Between } from 'typeorm';
import { BrandsService } from './brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    private brandsService: BrandsService,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      const where: FindConditions<Product> = {};
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return await this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      })
    }
    return await this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} was not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.description = payload.description;
    // newProduct.image = payload.image;
    // newProduct.price = payload.price;
    // newProduct.name = payload.name;
    // newProduct.stock = payload.stock;
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(payload.brandId);
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToProducts(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const category = await this.categoryRepo.findOne(categoryId);
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    if (!product.categories.find((item) => item.id == categoryId)) {
      product.categories.push(category);
    } else {
      throw new ConflictException(
        `Category #${categoryId} is already present in this product`,
      );
    }
    return this.productRepo.save(product);
  }

  async delete(id) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
