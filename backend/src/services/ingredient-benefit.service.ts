import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IngredientBenefit } from '../models/ingredient-benefit.model';
import { IIngredientBenefitRepository } from '../repositories/interfaces/ingredient-benefit.repository.interface';
import { Benefit } from '../models/benefit.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class IngredientBenefitService extends BaseService<IngredientBenefit> {
  constructor(private readonly ingredientBenefitRepository: IIngredientBenefitRepository) {
    super(ingredientBenefitRepository);
  }

  async linkIngredientToBenefit(ingredientId: string, benefitId: string): Promise<IngredientBenefit> {
    const existing = await this.ingredientBenefitRepository.findByIngredientAndBenefit(ingredientId, benefitId);
    if (existing) {
      throw new Error('This ingredient is already linked to this benefit');
    }

    const link = new IngredientBenefit({
      ingredient_id: ingredientId,
      benefit_id: benefitId
    });

    return this.create(link);
  }

  async unlinkIngredientFromBenefit(ingredientId: string, benefitId: string): Promise<void> {
    const existing = await this.ingredientBenefitRepository.findByIngredientAndBenefit(ingredientId, benefitId);
    if (!existing) {
      throw new Error('This ingredient is not linked to this benefit');
    }

    await this.delete(existing.id);
  }

  async getBenefitsForIngredient(ingredientId: string): Promise<Benefit[]> {
    return this.ingredientBenefitRepository.getBenefitsForIngredient(ingredientId);
  }

  async getIngredientsForBenefit(benefitId: string): Promise<Ingredient[]> {
    return this.ingredientBenefitRepository.getIngredientsForBenefit(benefitId);
  }
} 