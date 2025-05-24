import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IngredientSideEffect } from '../models/ingredient-side-effect.model';
import { IIngredientSideEffectRepository } from '../repositories/interfaces/ingredient-side-effect.repository.interface';

@Injectable()
export class IngredientSideEffectService extends BaseService<IngredientSideEffect> {
  constructor(private readonly ingredientSideEffectRepository: IIngredientSideEffectRepository) {
    super(ingredientSideEffectRepository);
  }

  async createIngredientSideEffect(ingredientSideEffect: IngredientSideEffect): Promise<IngredientSideEffect> {
    // Check if the association already exists
    const existing = await this.ingredientSideEffectRepository.findByIngredientAndSideEffect(
      ingredientSideEffect.ingredient_id,
      ingredientSideEffect.side_effect_id
    );

    if (existing) {
      throw new Error('This ingredient-side effect association already exists');
    }

    return this.create(ingredientSideEffect);
  }

  async findByIngredientId(ingredientId: string): Promise<IngredientSideEffect[]> {
    return this.ingredientSideEffectRepository.findByIngredientId(ingredientId);
  }

  async findBySideEffectId(sideEffectId: string): Promise<IngredientSideEffect[]> {
    return this.ingredientSideEffectRepository.findBySideEffectId(sideEffectId);
  }

  async findByIngredientAndSideEffect(ingredientId: string, sideEffectId: string): Promise<IngredientSideEffect | null> {
    return this.ingredientSideEffectRepository.findByIngredientAndSideEffect(ingredientId, sideEffectId);
  }

  async findWithRelations(id: string): Promise<IngredientSideEffect | null> {
    return this.ingredientSideEffectRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<IngredientSideEffect[]> {
    return this.ingredientSideEffectRepository.findAllWithRelations();
  }

  async findAllByIngredientWithSideEffects(ingredientId: string): Promise<IngredientSideEffect[]> {
    return this.ingredientSideEffectRepository.findAllByIngredientWithSideEffects(ingredientId);
  }

  async findAllBySideEffectWithIngredients(sideEffectId: string): Promise<IngredientSideEffect[]> {
    return this.ingredientSideEffectRepository.findAllBySideEffectWithIngredients(sideEffectId);
  }

  async updateIngredientSideEffect(
    id: string,
    ingredientSideEffect: Partial<IngredientSideEffect>
  ): Promise<IngredientSideEffect> {
    // If trying to update the relationship, check if the new one already exists
    if (ingredientSideEffect.ingredient_id || ingredientSideEffect.side_effect_id) {
      const current = await this.findById(id);
      const newIngredientId = ingredientSideEffect.ingredient_id || current.ingredient_id;
      const newSideEffectId = ingredientSideEffect.side_effect_id || current.side_effect_id;

      const existing = await this.findByIngredientAndSideEffect(newIngredientId, newSideEffectId);
      if (existing && existing.id !== id) {
        throw new Error('This ingredient-side effect association already exists');
      }
    }

    return this.update(id, ingredientSideEffect);
  }

  async bulkCreateIngredientSideEffects(
    ingredientId: string,
    sideEffectIds: string[]
  ): Promise<IngredientSideEffect[]> {
    const results: IngredientSideEffect[] = [];

    for (const sideEffectId of sideEffectIds) {
      try {
        const association = await this.createIngredientSideEffect(new IngredientSideEffect({
          ingredient_id: ingredientId,
          side_effect_id: sideEffectId
        }));
        results.push(association);
      } catch (error) {
        // Skip if association already exists
        if (!error.message.includes('already exists')) {
          throw error;
        }
      }
    }

    return results;
  }
} 