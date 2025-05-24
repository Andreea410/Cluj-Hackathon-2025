import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IIngredientSideEffectRepository } from './interfaces/ingredient-side-effect.repository.interface';
import { IngredientSideEffect } from '../models/ingredient-side-effect.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class IngredientSideEffectRepository extends BaseSupabaseRepository<IngredientSideEffect> implements IIngredientSideEffectRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'ingredient_side_effects', IngredientSideEffect);
  }

  async findByIngredientId(ingredientId: string): Promise<IngredientSideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('ingredient_id', ingredientId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientSideEffect.fromJSON(item));
  }

  async findBySideEffectId(sideEffectId: string): Promise<IngredientSideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('side_effect_id', sideEffectId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientSideEffect.fromJSON(item));
  }

  async findByIngredientAndSideEffect(ingredientId: string, sideEffectId: string): Promise<IngredientSideEffect | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('ingredient_id', ingredientId)
      .eq('side_effect_id', sideEffectId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? IngredientSideEffect.fromJSON(data) : null;
  }

  async findWithRelations(id: string): Promise<IngredientSideEffect | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        ingredient:ingredient_id (*),
        side_effect:side_effect_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? IngredientSideEffect.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<IngredientSideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        ingredient:ingredient_id (*),
        side_effect:side_effect_id (*)
      `);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientSideEffect.fromJSON(item));
  }

  async findAllByIngredientWithSideEffects(ingredientId: string): Promise<IngredientSideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        side_effect:side_effect_id (*)
      `)
      .eq('ingredient_id', ingredientId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientSideEffect.fromJSON(item));
  }

  async findAllBySideEffectWithIngredients(sideEffectId: string): Promise<IngredientSideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        ingredient:ingredient_id (*)
      `)
      .eq('side_effect_id', sideEffectId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => IngredientSideEffect.fromJSON(item));
  }
} 