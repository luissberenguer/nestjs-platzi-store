import {
  Controller,
  Query,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

// import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard )
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get('filter')
  getFilteredProducts() {
    return {
      message: `Yo so un filter`,
    };
  }

  @Public()
  @ApiOperation({ summary: 'List one signle product' })
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    const product = this.productService.findOne(productId);
    return product;
  }

  @Roles(Role.ADMIN)
  @Post()
  cretate(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Put(':id/category/:categoryId')
  updateCategories(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryToProducts(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
