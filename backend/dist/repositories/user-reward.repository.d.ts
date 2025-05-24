import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRewardRepository } from './interfaces/user-reward.repository.interface';
import { UserReward } from '../models/user-reward.model';
export declare class UserRewardRepository extends BaseSupabaseRepository<UserReward> implements IUserRewardRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<UserReward[]>;
    findByRewardId(rewardId: string): Promise<UserReward[]>;
    findByAuthUserId(authUserId: string): Promise<UserReward[]>;
    findByUserAndReward(userId: string, rewardId: string): Promise<UserReward | null>;
    findWithRelations(id: string): Promise<UserReward | null>;
    findAllWithRelations(): Promise<UserReward[]>;
    findAllByUserWithDetails(userId: string): Promise<UserReward[]>;
    findAllByRewardWithDetails(rewardId: string): Promise<UserReward[]>;
    findAllClaimedBetweenDates(startDate: Date, endDate: Date): Promise<UserReward[]>;
    countClaimedRewards(rewardId: string): Promise<number>;
}
