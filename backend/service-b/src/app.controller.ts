import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto, UpdateOrderDto } from './order.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // REST API Endpoints
  @Post('orders')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.appService.create(createOrderDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('orders')
  async getAllOrders() {
    return await this.appService.findAllWithProducts();
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.appService.findOneWithProducts(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  @Put('orders/:id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.appService.update(id, updateOrderDto);
  }

  @Delete('orders/:id')
  deleteOrder(@Param('id') id: string) {
    return this.appService.remove(id);
  }

  @MessagePattern({ cmd: 'create_order' })
  async create(@Payload() createOrderDto: CreateOrderDto) {
    try {
      return await this.appService.create(createOrderDto);
    } catch (error) {
      return {
        error: true,
        message: error.message || 'Failed to create order',
      };
    }
  }

  @MessagePattern({ cmd: 'get_all_orders' })
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'get_all_orders_with_products' })
  async findAllWithProducts() {
    try {
      return await this.appService.findAllWithProducts();
    } catch (error) {
      return {
        error: true,
        message: error.message || 'Failed to fetch orders',
      };
    }
  }

  @MessagePattern({ cmd: 'get_order' })
  findOne(@Payload() id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'get_order_with_products' })
  async findOneWithProducts(@Payload() id: string) {
    try {
      return await this.appService.findOneWithProducts(id);
    } catch (error) {
      return {
        error: true,
        message: error.message || 'Failed to fetch order',
      };
    }
  }

  @MessagePattern({ cmd: 'update_order' })
  update(@Payload() data: { id: string; updateOrderDto: UpdateOrderDto }) {
    return this.appService.update(data.id, data.updateOrderDto);
  }

  @MessagePattern({ cmd: 'delete_order' })
  remove(@Payload() id: string) {
    return this.appService.remove(id);
  }
}
