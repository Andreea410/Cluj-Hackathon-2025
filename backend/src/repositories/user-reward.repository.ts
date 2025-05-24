import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRewardRepository } from './interfaces/user-reward.repository.interface';
import { UserReward } from '../models/user-reward.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class UserRewardRepository extends BaseSupabaseRepository<UserReward> implements IUserRewardRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'user_rewards', UserReward);
  }

  async findByUserId(userId: string): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async findByRewardId(rewardId: string): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('reward_id', rewardId)
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId)
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async findByUserAndReward(userId: string, rewardId: string): Promise<UserReward | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('reward_id', rewardId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? UserReward.fromJSON(data) : null;
  }

  async findWithRelations(id: string): Promise<UserReward | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        reward:reward_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? UserReward.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        reward:reward_id (*)
      `)
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async findAllByUserWithDetails(userId: string): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        reward:reward_id (*)
      `)
      .eq('user_id', userId)
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async findAllByRewardWithDetails(rewardId: string): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .eq('reward_id', rewardId)
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async findAllClaimedBetweenDates(startDate: Date, endDate: Date): Promise<UserReward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('claimed_at', startDate.toISOString())
      .lte('claimed_at', endDate.toISOString())
      .order('claimed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }

  async countClaimedRewards(rewardId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('reward_id', rewardId);

    if (error) throw new DatabaseError(error.message);
    return count || 0;
  }
} 