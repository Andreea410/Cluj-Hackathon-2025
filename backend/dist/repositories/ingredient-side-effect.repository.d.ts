import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IIngredientSideEffectRepository } from './interfaces/ingredient-side-effect.repository.interface';
import { IngredientSideEffect } from '../models/ingredient-side-effect.model';
export declare class IngredientSideEffectRepository extends BaseSupabaseRepository<IngredientSideEffect> implements IIngredientSideEffectRepository {
    constructor(supabase: SupabaseClient);
    findByIngredientId(ingredientId: string): Promise<IngredientSideEffect[]>;
    findBySideEffectId(sideEffectId: string): Promise<IngredientSideEffect[]>;
    findByIngredientAndSideEffect(ingredientId: string, sideEffectId: string): Promise<IngredientSideEffect | null>;
    findWithRelations(id: string): Promise<IngredientSideEffect | null>;
    findAllWithRelations(): Promise<IngredientSideEffect[]>;
    findAllByIngredientWithSideEffects(ingredientId: string): Promise<IngredientSideEffect[]>;
    findAllBySideEffectWithIngredients(sideEffectId: string): Promise<IngredientSideEffect[]>;
}
