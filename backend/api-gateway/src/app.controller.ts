import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Product endpoints
  @Post('products')
  async createProduct(@Body() createProductDto: any) {
    return this.productClient.send({ cmd: 'create_product' }, createProductDto).toPromise();
  }

  @Get('products')
  async getAllProducts() {
    return this.productClient.send({ cmd: 'get_all_products' }, {}).toPromise();
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'get_product' }, id).toPromise();
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productClient
      .send({ cmd: 'update_product' }, { id, updateProductDto })
      .toPromise();
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productClient.send({ cmd: 'delete_product' }, id).toPromise();
  }

  // Order endpoints
  @Post('orders')
  async createOrder(@Body() createOrderDto: any) {
    try {
      if (!createOrderDto || !createOrderDto.items || !Array.isArray(createOrderDto.items) || createOrderDto.items.length === 0) {
        throw new HttpException('Order must have at least one item', HttpStatus.BAD_REQUEST);
      }
      
      // Validate each item has required fields
      for (const item of createOrderDto.items) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          throw new HttpException('Each order item must have a valid productId and quantity > 0', HttpStatus.BAD_REQUEST);
        }
      }
      
      const result = await Promise.race([
        this.orderClient.send({ cmd: 'create_order' }, createOrderDto).toPromise(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        ),
      ]);
      
      // Check if the result contains an error
      if (result && result.error) {
        throw new HttpException(result.message || 'Failed to create order', HttpStatus.BAD_REQUEST);
      }
      
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to create order',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('orders')
  async getAllOrders() {
    return this.orderClient.send({ cmd: 'get_all_orders_with_products' }, {}).toPromise();
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.orderClient.send({ cmd: 'get_order_with_products' }, id).toPromise();
  }

  @Put('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.orderClient
      .send({ cmd: 'update_order' }, { id, updateOrderDto })
      .toPromise();
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderClient.send({ cmd: 'delete_order' }, id).toPromise();
  }
}
