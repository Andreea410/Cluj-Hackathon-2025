import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { ISideEffectRepository } from './interfaces/side-effect.repository.interface';
import { SideEffect } from '../models/side-effect.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class SideEffectRepository extends BaseSupabaseRepository<SideEffect> implements ISideEffectRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'side_effects', SideEffect);
  }

  async findByName(name: string): Promise<SideEffect | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? SideEffect.fromJSON(data) : null;
  }

  async searchByName(query: string): Promise<SideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => SideEffect.fromJSON(item));
  }

  async findByNameOrDescription(query: string): Promise<SideEffect[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => SideEffect.fromJSON(item));
  }
} 