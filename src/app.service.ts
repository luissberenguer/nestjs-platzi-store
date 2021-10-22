import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS') private tasks: any[],
    private config: ConfigService,
  ) {}

  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    const dbName = this.config.get('DATABASE_NAME');
    console.log(this.tasks)
    return `Hello World apiKey: ${apiKey}, dbName: ${dbName} `;
  }
}
