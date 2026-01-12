import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Gateway is running! Use /products or /orders endpoints to interact with microservices';
  }
}
