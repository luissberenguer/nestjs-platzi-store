import { Module, Global } from '@nestjs/common';

const API_KEY = '123453421';
const API_KEY_PROD = 'PROD_123453421';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
