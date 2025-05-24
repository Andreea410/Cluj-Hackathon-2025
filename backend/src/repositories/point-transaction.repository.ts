import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPointTransactionRepository } from './interfaces/point-transaction.repository.interface';
import { PointTransaction } from '../models/point-transaction.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class PointTransactionRepository extends BaseSupabaseRepository<PointTransaction> implements IPointTransactionRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'point_transactions', PointTransaction);
  }

  async findByUserId(userId: string): Promise<PointTransaction[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PointTransaction.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<PointTransaction[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PointTransaction.fromJSON(item));
  }

  async findWithUser(id: string): Promise<PointTransaction | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? PointTransaction.fromJSON(data) : null;
  }

  async findAllWithUser(): Promise<PointTransaction[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PointTransaction.fromJSON(item));
  }

  async findAllByUserWithDetails(userId: string): Promise<PointTransaction[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PointTransaction.fromJSON(item));
  }

  async getTotalPointsByUser(userId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('points')
      .eq('user_id', userId);

    if (error) throw new DatabaseError(error.message);
    return data.reduce((total, transaction) => total + transaction.points, 0);
  }
} 