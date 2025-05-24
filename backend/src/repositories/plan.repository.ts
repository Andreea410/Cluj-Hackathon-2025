import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPlanRepository } from './interfaces/plan.repository.interface';
import { Plan } from '../models/plan.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class PlanRepository extends BaseSupabaseRepository<Plan> implements IPlanRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'plans', Plan);
  }

  async findByName(name: string): Promise<Plan | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Plan.fromJSON(data) : null;
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Plan[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('price_per_month', minPrice)
      .lte('price_per_month', maxPrice)
      .order('price_per_month');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Plan.fromJSON(item));
  }
} 