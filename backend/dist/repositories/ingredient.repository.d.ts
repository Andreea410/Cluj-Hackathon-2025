import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IIngredientRepository } from './interfaces/ingredient.repository.interface';
import { Ingredient } from '../models/ingredient.model';
export declare class IngredientRepository extends BaseSupabaseRepository<Ingredient> implements IIngredientRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<Ingredient | null>;
}
