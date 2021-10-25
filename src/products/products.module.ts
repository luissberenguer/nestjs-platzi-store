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

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand, Order])],
  controllers: [
    CategoriesController,
    ProductsController,
    BrandsController,
    OrdersController,
  ],
  providers: [ProductsService, CategoriesService, BrandsService, OrdersService],
  exports: [ProductsService],
})
export class ProductsModule {}
