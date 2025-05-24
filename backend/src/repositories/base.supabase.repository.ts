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
    try {
      console.log(`Creating ${this.tableName} with data:`, entity.toJSON());
      
      // First insert the entity
      const { data: insertData, error: insertError } = await this.supabase
        .from(this.tableName)
        .insert(entity.toJSON())
        .select()
        .single();

      if (insertError) {
        console.error(`Error inserting ${this.tableName}:`, insertError);
        throw new DatabaseError(`Failed to create record: ${insertError.message}`);
      }

      if (!insertData) {
        console.error(`No data returned after creating ${this.tableName}`);
        throw new DatabaseError('No data returned after creation');
      }

      console.log(`Successfully created ${this.tableName}:`, insertData);
      return this.modelConstructor.fromJSON(insertData);
    } catch (error) {
      console.error(`Error in create ${this.tableName}:`, error);
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError(`Failed to create record: ${error.message}`);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw new DatabaseError(error.message);
      }

      return data ? this.modelConstructor.fromJSON(data) : null;
    } catch (error) {
      console.error('Error finding record:', error);
      return null;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*');

      if (error) throw new DatabaseError(error.message);
      return data.map(item => this.modelConstructor.fromJSON(item));
    } catch (error) {
      console.error('Error finding records:', error);
      throw new DatabaseError('Failed to fetch records');
    }
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(entity)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          throw new DatabaseError('Record not found');
        }
        throw new DatabaseError(error.message);
      }

      return this.modelConstructor.fromJSON(data);
    } catch (error) {
      console.error('Error updating record:', error);
      throw new DatabaseError('Failed to update record');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw new DatabaseError(error.message);
    } catch (error) {
      console.error('Error deleting record:', error);
      throw new DatabaseError('Failed to delete record');
    }
  }
} 