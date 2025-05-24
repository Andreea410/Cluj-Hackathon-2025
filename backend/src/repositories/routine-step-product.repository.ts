import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineStepProductRepository } from './interfaces/routine-step-product.repository.interface';
import { RoutineStepProduct } from '../models/routine-step-product.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class RoutineStepProductRepository extends BaseSupabaseRepository<RoutineStepProduct> implements IRoutineStepProductRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'routine_step_products', RoutineStepProduct);
  }

  async findByRoutineStepId(routineStepId: string): Promise<RoutineStepProduct[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('routine_step_id', routineStepId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStepProduct.fromJSON(item));
  }

  async findByProductId(productId: string): Promise<RoutineStepProduct[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('product_id', productId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStepProduct.fromJSON(item));
  }

  async findByRoutineStepAndProduct(routineStepId: string, productId: string): Promise<RoutineStepProduct | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('routine_step_id', routineStepId)
      .eq('product_id', productId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? RoutineStepProduct.fromJSON(data) : null;
  }

  async findWithRelations(id: string): Promise<RoutineStepProduct | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        routine_step:routine_step_id (*),
        product:product_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? RoutineStepProduct.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<RoutineStepProduct[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        routine_step:routine_step_id (*),
        product:product_id (*)
      `);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStepProduct.fromJSON(item));
  }

  async findAllByStepWithProducts(routineStepId: string): Promise<RoutineStepProduct[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        product:product_id (*)
      `)
      .eq('routine_step_id', routineStepId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStepProduct.fromJSON(item));
  }

  async findAllByProductWithSteps(productId: string): Promise<RoutineStepProduct[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        routine_step:routine_step_id (*)
      `)
      .eq('product_id', productId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStepProduct.fromJSON(item));
  }
} 