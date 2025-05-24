import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Ingredient } from '../models/ingredient.model';
import { IIngredientRepository } from '../repositories/interfaces/ingredient.repository.interface';

@Injectable()
export class IngredientService extends BaseService<Ingredient> {
  constructor(private readonly ingredientRepository: IIngredientRepository) {
    super(ingredientRepository);
  }

  async createIngredient(ingredient: Ingredient): Promise<Ingredient> {
    const existingIngredient = await this.ingredientRepository.findByName(ingredient.name);
    if (existingIngredient) {
      throw new Error('An ingredient with this name already exists');
    }
    return this.create(ingredient);
  }

  async updateIngredient(id: string, ingredient: Partial<Ingredient>): Promise<Ingredient> {
    if (ingredient.name) {
      const existingIngredient = await this.ingredientRepository.findByName(ingredient.name);
      if (existingIngredient && existingIngredient.id !== id) {
        throw new Error('An ingredient with this name already exists');
      }
    }
    return this.update(id, ingredient);
  }
} 