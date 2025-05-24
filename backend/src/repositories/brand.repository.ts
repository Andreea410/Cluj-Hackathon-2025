import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IBrandRepository } from './interfaces/brand.repository.interface';
import { Brand } from '../models/brand.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class BrandRepository extends BaseSupabaseRepository<Brand> implements IBrandRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'brands', Brand);
  }

  async findByName(name: string): Promise<Brand | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Brand.fromJSON(data) : null;
  }

  async findByWebsite(website: string): Promise<Brand | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('website', website)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Brand.fromJSON(data) : null;
  }
} 