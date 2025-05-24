import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from '../models/base.model';
import { IBaseRepository } from './interfaces/base.repository.interface';
import { DatabaseError } from '../shared/exceptions/database.error';

type ModelConstructor<T> = {
  new (partial: Partial<T>): T;
  fromJSON(json: any): T;
};

export abstract class BaseSupabaseRepository<T extends BaseModel> implements IBaseRepository<T> {
  protected constructor(
    protected readonly supabase: SupabaseClient,
    protected readonly tableName: string,
    protected readonly modelConstructor: ModelConstructor<T>
  ) {}

  async create(entity: T): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(entity.toJSON())
      .single();

    if (error) throw new DatabaseError(error.message);
    return this.modelConstructor.fromJSON(data);
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? this.modelConstructor.fromJSON(data) : null;
  }

  async findAll(): Promise<T[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => this.modelConstructor.fromJSON(item));
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(entity)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return this.modelConstructor.fromJSON(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw new DatabaseError(error.message);
  }
} 