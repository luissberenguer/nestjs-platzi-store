import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
// import { BrandsController } from './controllers/brands.controller';
// import { OrdersController } from './controllers/orders.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
// import { BrandsService } from './services/brands.service';
// import { OrdersService } from './services/orders.service';

@Module({
  controllers: [CategoriesController, ProductsController],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
