import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineTemplateRepository } from './interfaces/routine-template.repository.interface';
import { RoutineTemplate } from '../models/routine-template.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class RoutineTemplateRepository extends BaseSupabaseRepository<RoutineTemplate> implements IRoutineTemplateRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'routine_templates', RoutineTemplate);
  }

  async findByName(name: string): Promise<RoutineTemplate[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', `%${name}%`)
      .order('name');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineTemplate.fromJSON(item));
  }

  async findByNameExact(name: string): Promise<RoutineTemplate | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? RoutineTemplate.fromJSON(data) : null;
  }

  async searchTemplates(query: string): Promise<RoutineTemplate[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineTemplate.fromJSON(item));
  }
} 