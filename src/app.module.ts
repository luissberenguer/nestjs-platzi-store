import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { OrdersService } from './services/orders.service';
import { CustomersService } from './services/customers.service'

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [
    AppService,
    ProductsService,
    UsersService,
    BrandsService,
    CategoriesService,
    OrdersService,
    CustomersService,
  ],
})
export class AppModule {}
