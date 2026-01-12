import { IsString, IsNumber, IsArray, IsOptional, IsEnum, Min, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItem {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface OrderItemWithProduct extends OrderItem {
  product?: Product;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderWithProducts extends Omit<Order, 'items'> {
  items: OrderItemWithProduct[];
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Order must have at least one item' })
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Invalid order status' })
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}
