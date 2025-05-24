import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRewardRepository } from './interfaces/reward.repository.interface';
import { Reward } from '../models/reward.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class RewardRepository extends BaseSupabaseRepository<Reward> implements IRewardRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'rewards', Reward);
  }

  async findByThresholdRange(minPoints: number, maxPoints: number): Promise<Reward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('threshold_points', minPoints)
      .lte('threshold_points', maxPoints)
      .order('threshold_points', { ascending: true });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Reward.fromJSON(item));
  }

  async findAvailableRewards(userPoints: number): Promise<Reward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .lte('threshold_points', userPoints)
      .order('threshold_points', { ascending: true });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Reward.fromJSON(item));
  }

  async findByName(name: string): Promise<Reward | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Reward.fromJSON(data) : null;
  }

  async searchRewards(searchTerm: string): Promise<Reward[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('threshold_points', { ascending: true });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Reward.fromJSON(item));
  }
} 