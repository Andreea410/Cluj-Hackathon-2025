import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { ProductIngredient } from '../models/product-ingredient.model';
import { IProductIngredientRepository } from '../repositories/interfaces/product-ingredient.repository.interface';
import { Product } from '../models/product.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class ProductIngredientService extends BaseService<ProductIngredient> {
  constructor(private readonly productIngredientRepository: IProductIngredientRepository) {
    super(productIngredientRepository);
  }

  async addIngredientToProduct(productId: string, ingredientId: string): Promise<ProductIngredient> {
    const existing = await this.productIngredientRepository.findByProductAndIngredient(
      productId,
      ingredientId
    );

    if (existing) {
      throw new Error('This ingredient is already added to the product');
    }

    const productIngredient = new ProductIngredient({
      product_id: productId,
      ingredient_id: ingredientId
    });

    return this.create(productIngredient);
  }

  async removeIngredientFromProduct(productId: string, ingredientId: string): Promise<void> {
    const existing = await this.productIngredientRepository.findByProductAndIngredient(
      productId,
      ingredientId
    );

    if (!existing) {
      throw new Error('This ingredient is not associated with the product');
    }

    await this.delete(existing.id);
  }

  async getProductIngredients(productId: string): Promise<{ product: Product; ingredients: Ingredient[] }> {
    return this.productIngredientRepository.findProductsWithIngredients(productId);
  }

  async getIngredientProducts(ingredientId: string): Promise<{ ingredient: Ingredient; products: Product[] }> {
    return this.productIngredientRepository.findIngredientProducts(ingredientId);
  }

  async getProductIngredientsList(productId: string): Promise<ProductIngredient[]> {
    return this.productIngredientRepository.findByProductId(productId);
  }

  async getIngredientProductsList(ingredientId: string): Promise<ProductIngredient[]> {
    return this.productIngredientRepository.findByIngredientId(ingredientId);
  }
} 