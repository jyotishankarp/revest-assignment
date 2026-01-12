import { IsString, IsNumber, IsOptional, Min, MinLength, MaxLength } from 'class-validator';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Product name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Product name must not exceed 100 characters' })
  name: string;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Stock must be a positive number' })
  stock: number;

  @IsString()
  @MinLength(2, { message: 'Category must be at least 2 characters long' })
  category: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Product name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Product name must not exceed 100 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Stock must be a positive number' })
  stock?: number;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Category must be at least 2 characters long' })
  category?: string;
}
