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
      port: 3101,
    },
  });
  
  // Start microservice
  await app.startAllMicroservices();
  
  // Start HTTP server on port 3001
  await app.listen(3001);
  console.log('Product Service is running on http://localhost:3001 (REST API)');
  console.log('Product Service microservice is listening on TCP port 3101');
}
bootstrap();
