import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IBenefitRepository } from './interfaces/benefit.repository.interface';
import { Benefit } from '../models/benefit.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class BenefitRepository extends BaseSupabaseRepository<Benefit> implements IBenefitRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'benefits', Benefit);
  }

  async findByName(name: string): Promise<Benefit | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Benefit.fromJSON(data) : null;
  }
} 