import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { ISubscriptionRepository } from './interfaces/subscription.repository.interface';
import { Subscription } from '../models/subscription.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class SubscriptionRepository extends BaseSupabaseRepository<Subscription> implements ISubscriptionRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'subscriptions', Subscription);
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }

  async findByPlanId(planId: string): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('plan_id', planId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }

  async findByStatus(status: string): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('status', status);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('start_date', startDate.toISOString())
      .lte('end_date', endDate.toISOString());

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }

  async findActiveSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString());

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }

  async findWithRelations(id: string): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        plan:plan_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Subscription.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        plan:plan_id (*)
      `);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Subscription.fromJSON(item));
  }
} 