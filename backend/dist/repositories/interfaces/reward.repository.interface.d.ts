import { IBaseRepository } from './base.repository.interface';
import { Reward } from '../../models/reward.model';
export interface IRewardRepository extends IBaseRepository<Reward> {
    findByThresholdRange(minPoints: number, maxPoints: number): Promise<Reward[]>;
    findAvailableRewards(userPoints: number): Promise<Reward[]>;
    findByName(name: string): Promise<Reward | null>;
    searchRewards(searchTerm: string): Promise<Reward[]>;
}
