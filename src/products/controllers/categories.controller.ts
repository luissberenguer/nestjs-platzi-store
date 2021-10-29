import {
  Controller,
  Query,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';

// import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  @Get()
  getAll(@Query() params: FilterCategoryDto) {
    return this.categoryService.findAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const category = this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException(`category #${id} was not found`);
    }
    return category;
  }

  @Post()
  cretate(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
