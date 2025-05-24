import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IIngredientBenefitRepository } from './interfaces/ingredient-benefit.repository.interface';
import { IngredientBenefit } from '../models/ingredient-benefit.model';
import { Benefit } from '../models/benefit.model';
import { Ingredient } from '../models/ingredient.model';
export declare class IngredientBenefitRepository extends BaseSupabaseRepository<IngredientBenefit> implements IIngredientBenefitRepository {
    constructor(supabase: SupabaseClient);
    findByIngredientId(ingredientId: string): Promise<IngredientBenefit[]>;
    findByBenefitId(benefitId: string): Promise<IngredientBenefit[]>;
    findByIngredientAndBenefit(ingredientId: string, benefitId: string): Promise<IngredientBenefit | null>;
    getBenefitsForIngredient(ingredientId: string): Promise<Benefit[]>;
    getIngredientsForBenefit(benefitId: string): Promise<Ingredient[]>;
}
