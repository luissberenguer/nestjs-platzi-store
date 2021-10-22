import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(this.tasks);
    return `Hello World apiKey: ${apiKey}, dbName: ${dbName} `;
  }
}
