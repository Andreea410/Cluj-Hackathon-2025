import { BaseService } from './base.service';
import { UserReward } from '../models/user-reward.model';
import { IUserRewardRepository } from '../repositories/interfaces/user-reward.repository.interface';
export declare class UserRewardService extends BaseService<UserReward> {
    private readonly userRewardRepository;
    constructor(userRewardRepository: IUserRewardRepository);
    claimReward(userReward: UserReward): Promise<UserReward>;
    findByUserId(userId: string): Promise<UserReward[]>;
    findByRewardId(rewardId: string): Promise<UserReward[]>;
    findByAuthUserId(authUserId: string): Promise<UserReward[]>;
    findByUserAndReward(userId: string, rewardId: string): Promise<UserReward | null>;
    findWithRelations(id: string): Promise<UserReward | null>;
    findAllWithRelations(): Promise<UserReward[]>;
    findAllByUserWithDetails(userId: string): Promise<UserReward[]>;
    findAllByRewardWithDetails(rewardId: string): Promise<UserReward[]>;
    findAllClaimedBetweenDates(startDate: Date, endDate: Date): Promise<UserReward[]>;
    getRewardStatistics(rewardId: string): Promise<{
        totalClaims: number;
        claimsByDate: {
            date: string;
            count: number;
        }[];
    }>;
    bulkClaimRewards(userId: string, rewardIds: string[]): Promise<UserReward[]>;
    hasUserClaimedReward(userId: string, rewardId: string): Promise<boolean>;
    getRecentClaims(limit?: number): Promise<UserReward[]>;
}
