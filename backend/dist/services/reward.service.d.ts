import { BaseService } from './base.service';
import { Reward } from '../models/reward.model';
import { IRewardRepository } from '../repositories/interfaces/reward.repository.interface';
export declare class RewardService extends BaseService<Reward> {
    private readonly rewardRepository;
    constructor(rewardRepository: IRewardRepository);
    createReward(reward: Reward): Promise<Reward>;
    findByThresholdRange(minPoints: number, maxPoints: number): Promise<Reward[]>;
    findAvailableRewards(userPoints: number): Promise<Reward[]>;
    findByName(name: string): Promise<Reward | null>;
    searchRewards(searchTerm: string): Promise<Reward[]>;
    updateReward(id: string, reward: Partial<Reward>): Promise<Reward>;
    bulkCreateRewards(rewards: Array<Omit<Reward, 'id'>>): Promise<Reward[]>;
}
