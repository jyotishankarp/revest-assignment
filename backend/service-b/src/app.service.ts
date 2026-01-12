import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Order, CreateOrderDto, UpdateOrderDto, OrderWithProducts, Product } from './order.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor(private readonly httpService: HttpService) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Validate products exist and get their details via REST API
    const productIds = createOrderDto.items.map((item) => item.productId);
    const response = await firstValueFrom(
      this.httpService.post<Product[]>('/products/by-ids', { ids: productIds }),
    );
    const products = response.data;

    if (products.length !== productIds.length) {
      throw new Error('One or more products not found');
    }

    // Calculate total price
    const totalPrice = createOrderDto.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const order: Order = {
      id: (this.idCounter++).toString(),
      items: createOrderDto.items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  async findAllWithProducts(): Promise<OrderWithProducts[]> {
    const orders = this.orders;
    const allProductIds = [...new Set(orders.flatMap((order) => order.items.map((item) => item.productId)))];
    
    let products: Product[] = [];
    if (allProductIds.length > 0) {
      const response = await firstValueFrom(
        this.httpService.post<Product[]>('/products/by-ids', { ids: allProductIds }),
      );
      products = response.data;
    }

    return orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      })),
    }));
  }

  findOne(id: string): Order | null {
    return this.orders.find((o) => o.id === id) || null;
  }

  async findOneWithProducts(id: string): Promise<OrderWithProducts | null> {
    const order = this.findOne(id);
    if (!order) {
      return null;
    }

    const productIds = order.items.map((item) => item.productId);
    const response = await firstValueFrom(
      this.httpService.post<Product[]>('/products/by-ids', { ids: productIds }),
    );
    const products = response.data;

    return {
      ...order,
      items: order.items.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      })),
    };
  }

  update(id: string, updateOrderDto: UpdateOrderDto): Order | null {
    const orderIndex = this.orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return null;
    }
    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      ...updateOrderDto,
      updatedAt: new Date().toISOString(),
    };
    return this.orders[orderIndex];
  }

  remove(id: string): boolean {
    const orderIndex = this.orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return false;
    }
    this.orders.splice(orderIndex, 1);
    return true;
  }
}
