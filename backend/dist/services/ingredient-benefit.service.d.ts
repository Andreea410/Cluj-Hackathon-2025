import { BaseService } from './base.service';
import { IngredientBenefit } from '../models/ingredient-benefit.model';
import { IIngredientBenefitRepository } from '../repositories/interfaces/ingredient-benefit.repository.interface';
import { Benefit } from '../models/benefit.model';
import { Ingredient } from '../models/ingredient.model';
export declare class IngredientBenefitService extends BaseService<IngredientBenefit> {
    private readonly ingredientBenefitRepository;
    constructor(ingredientBenefitRepository: IIngredientBenefitRepository);
    linkIngredientToBenefit(ingredientId: string, benefitId: string): Promise<IngredientBenefit>;
    unlinkIngredientFromBenefit(ingredientId: string, benefitId: string): Promise<void>;
    getBenefitsForIngredient(ingredientId: string): Promise<Benefit[]>;
    getIngredientsForBenefit(benefitId: string): Promise<Ingredient[]>;
}
