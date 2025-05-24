import { RewardService } from '../services/reward.service';
import { Reward } from '../models/reward.model';
export declare class RewardController {
    private readonly rewardService;
    constructor(rewardService: RewardService);
    createReward(reward: Reward): Promise<Reward>;
    bulkCreateRewards(data: {
        rewards: Array<Omit<Reward, 'id'>>;
    }): Promise<Reward[]>;
    getReward(id: string): Promise<Reward>;
    getAllRewards(minPoints?: number, maxPoints?: number, userPoints?: number, search?: string): Promise<Reward[]>;
    getRewardByName(name: string): Promise<Reward>;
    updateReward(id: string, reward: Partial<Reward>): Promise<Reward>;
    deleteReward(id: string): Promise<void>;
}
