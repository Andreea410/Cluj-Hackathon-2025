import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductIngredientService } from '../services/product-ingredient.service';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';
import { Ingredient } from '../models/ingredient.model';

@Controller('product-ingredients')
export class ProductIngredientController {
  constructor(private readonly productIngredientService: ProductIngredientService) {}

  @Post('product/:productId/ingredient/:ingredientId')
  async addIngredientToProduct(
    @Param('productId') productId: string,
    @Param('ingredientId') ingredientId: string
  ): Promise<ProductIngredient> {
    try {
      return await this.productIngredientService.addIngredientToProduct(productId, ingredientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('product/:productId/ingredient/:ingredientId')
  async removeIngredientFromProduct(
    @Param('productId') productId: string,
    @Param('ingredientId') ingredientId: string
  ): Promise<void> {
    try {
      await this.productIngredientService.removeIngredientFromProduct(productId, ingredientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('product/:productId/ingredients')
  async getProductIngredients(
    @Param('productId') productId: string
  ): Promise<{ product: Product; ingredients: Ingredient[] }> {
    try {
      return await this.productIngredientService.getProductIngredients(productId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('ingredient/:ingredientId/products')
  async getIngredientProducts(
    @Param('ingredientId') ingredientId: string
  ): Promise<{ ingredient: Ingredient; products: Product[] }> {
    try {
      return await this.productIngredientService.getIngredientProducts(ingredientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('product/:productId')
  async getProductIngredientsList(
    @Param('productId') productId: string
  ): Promise<ProductIngredient[]> {
    try {
      return await this.productIngredientService.getProductIngredientsList(productId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('ingredient/:ingredientId')
  async getIngredientProductsList(
    @Param('ingredientId') ingredientId: string
  ): Promise<ProductIngredient[]> {
    try {
      return await this.productIngredientService.getIngredientProductsList(ingredientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 