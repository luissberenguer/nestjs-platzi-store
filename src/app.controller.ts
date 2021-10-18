import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  nueva() {
    return 'soy una nueva ruta';
  }

  @Get('/products/:id')
  getParams(@Param('id') id: any) {
    return `prduct ${id}`;
  }

}
