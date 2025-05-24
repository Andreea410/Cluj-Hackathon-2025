import { IBaseRepository } from './base.repository.interface';
import { UserReward } from '../../models/user-reward.model';

export interface IUserRewardRepository extends IBaseRepository<UserReward> {
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