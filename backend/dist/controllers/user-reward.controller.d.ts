import { UserRewardService } from '../services/user-reward.service';
import { UserReward } from '../models/user-reward.model';
export declare class UserRewardController {
    private readonly userRewardService;
    constructor(userRewardService: UserRewardService);
    claimReward(userReward: UserReward): Promise<UserReward>;
    bulkClaimRewards(userId: string, data: {
        rewardIds: string[];
    }): Promise<UserReward[]>;
    getUserReward(id: string, includeRelations?: boolean): Promise<UserReward>;
    getAllUserRewards(userId?: string, rewardId?: string, authUserId?: string, includeRelations?: boolean, startDate?: string, endDate?: string): Promise<UserReward[]>;
    getRewardStatistics(rewardId: string): Promise<{
        totalClaims: number;
        claimsByDate: {
            date: string;
            count: number;
        }[];
    }>;
    checkRewardClaimed(userId: string, rewardId: string): Promise<{
        claimed: boolean;
    }>;
    getRecentClaims(limit?: number): Promise<UserReward[]>;
    deleteUserReward(id: string): Promise<void>;
}
