import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserReward } from '../models/user-reward.model';
import { IUserRewardRepository } from '../repositories/interfaces/user-reward.repository.interface';

@Injectable()
export class UserRewardService extends BaseService<UserReward> {
  constructor(private readonly userRewardRepository: IUserRewardRepository) {
    super(userRewardRepository);
  }

  async claimReward(userReward: UserReward): Promise<UserReward> {
    // Check if user has already claimed this reward
    const existing = await this.userRewardRepository.findByUserAndReward(
      userReward.user_id,
      userReward.reward_id
    );

    if (existing) {
      throw new Error('User has already claimed this reward');
    }

    // Set claimed_at timestamp
    userReward.claimed_at = new Date();
    return this.create(userReward);
  }

  async findByUserId(userId: string): Promise<UserReward[]> {
    return this.userRewardRepository.findByUserId(userId);
  }

  async findByRewardId(rewardId: string): Promise<UserReward[]> {
    return this.userRewardRepository.findByRewardId(rewardId);
  }

  async findByAuthUserId(authUserId: string): Promise<UserReward[]> {
    return this.userRewardRepository.findByAuthUserId(authUserId);
  }

  async findByUserAndReward(userId: string, rewardId: string): Promise<UserReward | null> {
    return this.userRewardRepository.findByUserAndReward(userId, rewardId);
  }

  async findWithRelations(id: string): Promise<UserReward | null> {
    return this.userRewardRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<UserReward[]> {
    return this.userRewardRepository.findAllWithRelations();
  }

  async findAllByUserWithDetails(userId: string): Promise<UserReward[]> {
    return this.userRewardRepository.findAllByUserWithDetails(userId);
  }

  async findAllByRewardWithDetails(rewardId: string): Promise<UserReward[]> {
    return this.userRewardRepository.findAllByRewardWithDetails(rewardId);
  }

  async findAllClaimedBetweenDates(startDate: Date, endDate: Date): Promise<UserReward[]> {
    return this.userRewardRepository.findAllClaimedBetweenDates(startDate, endDate);
  }

  async getRewardStatistics(rewardId: string): Promise<{
    totalClaims: number;
    claimsByDate: { date: string; count: number }[];
  }> {
    const claims = await this.findByRewardId(rewardId);
    const totalClaims = claims.length;

    // Group claims by date
    const claimsByDate = claims.reduce((acc, claim) => {
      const date = claim.claimed_at.toISOString().split('T')[0];
      const existingEntry = acc.find(entry => entry.date === date);
      
      if (existingEntry) {
        existingEntry.count++;
      } else {
        acc.push({ date, count: 1 });
      }
      
      return acc;
    }, [] as { date: string; count: number }[]);

    // Sort by date
    claimsByDate.sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalClaims,
      claimsByDate
    };
  }

  async bulkClaimRewards(
    userId: string,
    rewardIds: string[]
  ): Promise<UserReward[]> {
    const results: UserReward[] = [];

    for (const rewardId of rewardIds) {
      try {
        const userReward = await this.claimReward(new UserReward({
          user_id: userId,
          reward_id: rewardId,
          claimed_at: new Date()
        }));
        results.push(userReward);
      } catch (error) {
        // Skip if reward already claimed
        if (!error.message.includes('already claimed')) {
          throw error;
        }
      }
    }

    return results;
  }

  async hasUserClaimedReward(userId: string, rewardId: string): Promise<boolean> {
    const claimed = await this.findByUserAndReward(userId, rewardId);
    return !!claimed;
  }

  async getRecentClaims(limit: number = 10): Promise<UserReward[]> {
    const { data, error } = await this.userRewardRepository['supabase']
      .from(this.userRewardRepository['tableName'])
      .select(`
        *,
        user:user_id (*),
        reward:reward_id (*)
      `)
      .order('claimed_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data.map(item => UserReward.fromJSON(item));
  }
} 