import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IIngredientBenefitRepository } from './interfaces/ingredient-benefit.repository.interface';
import { IngredientBenefit } from '../models/ingredient-benefit.model';
import { Benefit } from '../models/benefit.model';
import { Ingredient } from '../models/ingredient.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class IngredientBenefitRepository extends BaseSupabaseRepository<IngredientBenefit> implements IIngredientBenefitRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'ingredient_benefits', IngredientBenefit);
  }

  async findByIngredientId(ingredientId: string): Promise<IngredientBenefit[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('ingredient_id', ingredientId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientBenefit.fromJSON(item));
  }

  async findByBenefitId(benefitId: string): Promise<IngredientBenefit[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('benefit_id', benefitId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientBenefit.fromJSON(item));
  }

  async findByIngredientAndBenefit(ingredientId: string, benefitId: string): Promise<IngredientBenefit | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('ingredient_id', ingredientId)
      .eq('benefit_id', benefitId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? IngredientBenefit.fromJSON(data) : null;
  }

  async getBenefitsForIngredient(ingredientId: string): Promise<Benefit[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        benefit_id,
        benefits:benefit_id (*)
      `)
      .eq('ingredient_id', ingredientId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Benefit.fromJSON(item.benefits));
  }

  async getIngredientsForBenefit(benefitId: string): Promise<Ingredient[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        ingredient_id,
        ingredients:ingredient_id (*)
      `)
      .eq('benefit_id', benefitId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Ingredient.fromJSON(item.ingredients));
  }
} 