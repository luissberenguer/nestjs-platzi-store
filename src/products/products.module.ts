import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService, CategoriesService, BrandsService, TypeOrmModule],
})
export class ProductsModule {}
