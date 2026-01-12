import { Injectable } from '@nestjs/common';
import { Product, CreateProductDto, UpdateProductDto } from './product.entity';

@Injectable()
export class AppService {
  private products: Product[] = [];
  private idCounter = 1;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: (this.idCounter++).toString(),
      ...createProductDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product | null {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return null;
    }
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
      updatedAt: new Date().toISOString(),
    };
    return this.products[productIndex];
  }

  remove(id: string): boolean {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return false;
    }
    this.products.splice(productIndex, 1);
    return true;
  }

  findByIds(ids: string[]): Product[] {
    return this.products.filter((p) => ids.includes(p.id));
  }
}
