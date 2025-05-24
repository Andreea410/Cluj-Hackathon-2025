import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Product } from '../models/product.model';
import { IProductRepository } from '../repositories/interfaces/product.repository.interface';
import { Brand } from '../models/brand.model';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(private readonly productRepository: IProductRepository) {
    super(productRepository);
  }

  async createProduct(product: Product): Promise<Product> {
    const existingProduct = await this.productRepository.findByName(product.name);
    if (existingProduct) {
      throw new Error('A product with this name already exists');
    }
    return this.create(product);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    if (product.name) {
      const existingProduct = await this.productRepository.findByName(product.name);
      if (existingProduct && existingProduct.id !== id) {
        throw new Error('A product with this name already exists');
      }
    }

    if (product.stock !== undefined && product.stock < 0) {
      throw new Error('Stock cannot be negative');
    }

    if (product.price !== undefined && product.price < 0) {
      throw new Error('Price cannot be negative');
    }

    return this.update(id, product);
  }

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return this.productRepository.findByBrandId(brandId);
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    if (minPrice < 0 || maxPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    if (minPrice > maxPrice) {
      throw new Error('Minimum price cannot be greater than maximum price');
    }
    return this.productRepository.findByPriceRange(minPrice, maxPrice);
  }

  async getInStockProducts(): Promise<Product[]> {
    return this.productRepository.findInStock();
  }

  async getOutOfStockProducts(): Promise<Product[]> {
    return this.productRepository.findOutOfStock();
  }

  async getProductWithBrand(id: string): Promise<{ product: Product; brand: Brand } | null> {
    const result = await this.productRepository.findWithBrand(id);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productRepository.searchProducts(query);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findById(id);
    const newStock = product.stock + quantity;
    
    if (newStock < 0) {
      throw new Error('Cannot reduce stock below 0');
    }

    return this.update(id, { stock: newStock });
  }
} 