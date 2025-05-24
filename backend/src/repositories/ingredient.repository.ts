import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IIngredientRepository } from './interfaces/ingredient.repository.interface';
import { Ingredient } from '../models/ingredient.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class IngredientRepository extends BaseSupabaseRepository<Ingredient> implements IIngredientRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'ingredients', Ingredient);
  }

  async findByName(name: string): Promise<Ingredient | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Ingredient.fromJSON(data) : null;
  }
} 