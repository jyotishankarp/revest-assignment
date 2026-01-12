import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateProductDto, UpdateProductDto } from './product.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // REST API Endpoints
  @Post('products')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.appService.create(createProductDto);
  }

  @Get('products')
  getAllProducts() {
    return this.appService.findAll();
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.appService.findOne(id);
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.appService.update(id, updateProductDto);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.appService.remove(id);
  }

  @Post('products/by-ids')
  getProductsByIds(@Body() body: { ids: string[] }) {
    return this.appService.findByIds(body.ids);
  }

  // Microservice Message Patterns (for API Gateway compatibility)
  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.appService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'get_all_products' })
  findAll() {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'get_product' })
  findOne(@Payload() id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() data: { id: string; updateProductDto: UpdateProductDto }) {
    return this.appService.update(data.id, data.updateProductDto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload() id: string) {
    return this.appService.remove(id);
  }

  @MessagePattern({ cmd: 'get_products_by_ids' })
  findByIds(@Payload() ids: string[]) {
    return this.appService.findByIds(ids);
  }
}
