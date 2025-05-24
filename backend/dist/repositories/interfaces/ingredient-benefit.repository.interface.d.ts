import { IBaseRepository } from './base.repository.interface';
import { IngredientBenefit } from '../../models/ingredient-benefit.model';
import { Benefit } from '../../models/benefit.model';
import { Ingredient } from '../../models/ingredient.model';
export interface IIngredientBenefitRepository extends IBaseRepository<IngredientBenefit> {
    findByIngredientId(ingredientId: string): Promise<IngredientBenefit[]>;
    findByBenefitId(benefitId: string): Promise<IngredientBenefit[]>;
    findByIngredientAndBenefit(ingredientId: string, benefitId: string): Promise<IngredientBenefit | null>;
    getBenefitsForIngredient(ingredientId: string): Promise<Benefit[]>;
    getIngredientsForBenefit(benefitId: string): Promise<Ingredient[]>;
}
