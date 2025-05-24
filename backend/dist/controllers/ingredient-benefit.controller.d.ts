import { IngredientBenefitService } from '../services/ingredient-benefit.service';
import { IngredientBenefit } from '../models/ingredient-benefit.model';
import { Benefit } from '../models/benefit.model';
import { Ingredient } from '../models/ingredient.model';
export declare class IngredientBenefitController {
    private readonly ingredientBenefitService;
    constructor(ingredientBenefitService: IngredientBenefitService);
    linkIngredientToBenefit(ingredientId: string, benefitId: string): Promise<IngredientBenefit>;
    unlinkIngredientFromBenefit(ingredientId: string, benefitId: string): Promise<void>;
    getBenefitsForIngredient(ingredientId: string): Promise<Benefit[]>;
    getIngredientsForBenefit(benefitId: string): Promise<Ingredient[]>;
}
