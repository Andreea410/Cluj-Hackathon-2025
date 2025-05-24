import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRewardRepository } from './interfaces/reward.repository.interface';
import { Reward } from '../models/reward.model';
export declare class RewardRepository extends BaseSupabaseRepository<Reward> implements IRewardRepository {
    constructor(supabase: SupabaseClient);
    findByThresholdRange(minPoints: number, maxPoints: number): Promise<Reward[]>;
    findAvailableRewards(userPoints: number): Promise<Reward[]>;
    findByName(name: string): Promise<Reward | null>;
    searchRewards(searchTerm: string): Promise<Reward[]>;
}
