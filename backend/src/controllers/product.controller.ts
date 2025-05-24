import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Brand } from '../models/brand.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: Product): Promise<Product> {
    try {
      return await this.productService.createProduct(product);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    try {
      return await this.productService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/with-brand')
  async getProductWithBrand(@Param('id') id: string): Promise<{ product: Product; brand: Brand }> {
    try {
      return await this.productService.getProductWithBrand(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllProducts(
    @Query('brand') brandId?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('inStock') inStock?: boolean,
    @Query('search') search?: string
  ): Promise<Product[]> {
    try {
      if (search) {
        return await this.productService.searchProducts(search);
      }
      if (brandId) {
        return await this.productService.getProductsByBrand(brandId);
      }
      if (minPrice !== undefined && maxPrice !== undefined) {
        return await this.productService.getProductsByPriceRange(minPrice, maxPrice);
      }
      if (inStock !== undefined) {
        return inStock 
          ? await this.productService.getInStockProducts()
          : await this.productService.getOutOfStockProducts();
      }
      return await this.productService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: Partial<Product>
  ): Promise<Product> {
    try {
      return await this.productService.updateProduct(id, product);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/stock')
  async updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number
  ): Promise<Product> {
    try {
      return await this.productService.updateStock(id, quantity);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    try {
      await this.productService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 