import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  // Create HTTP application
  const app = await NestFactory.create(AppModule);
  
  // Apply global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // Apply global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Connect microservice (TCP) for backward compatibility with API Gateway
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3102,
    },
  });
  
  // Start microservice
  await app.startAllMicroservices();
  
  // Start HTTP server on port 3002
  await app.listen(3002);
  console.log('Order Service is running on http://localhost:3002 (REST API)');
  console.log('Order Service microservice is listening on TCP port 3102');
}
bootstrap();
