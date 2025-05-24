import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Reward } from '../models/reward.model';
import { IRewardRepository } from '../repositories/interfaces/reward.repository.interface';

@Injectable()
export class RewardService extends BaseService<Reward> {
  constructor(private readonly rewardRepository: IRewardRepository) {
    super(rewardRepository);
  }

  async createReward(reward: Reward): Promise<Reward> {
    // Validate threshold points
    if (!Number.isInteger(reward.threshold_points) || reward.threshold_points < 0) {
      throw new Error('Threshold points must be a non-negative integer');
    }

    // Check for duplicate name
    const existing = await this.rewardRepository.findByName(reward.name);
    if (existing) {
      throw new Error('A reward with this name already exists');
    }

    return this.create(reward);
  }

  async findByThresholdRange(minPoints: number, maxPoints: number): Promise<Reward[]> {
    if (!Number.isInteger(minPoints) || !Number.isInteger(maxPoints)) {
      throw new Error('Points must be integer values');
    }
    if (minPoints > maxPoints) {
      throw new Error('Minimum points cannot be greater than maximum points');
    }
    return this.rewardRepository.findByThresholdRange(minPoints, maxPoints);
  }

  async findAvailableRewards(userPoints: number): Promise<Reward[]> {
    if (!Number.isInteger(userPoints) || userPoints < 0) {
      throw new Error('User points must be a non-negative integer');
    }
    return this.rewardRepository.findAvailableRewards(userPoints);
  }

  async findByName(name: string): Promise<Reward | null> {
    return this.rewardRepository.findByName(name);
  }

  async searchRewards(searchTerm: string): Promise<Reward[]> {
    if (!searchTerm || searchTerm.trim().length === 0) {
      throw new Error('Search term cannot be empty');
    }
    return this.rewardRepository.searchRewards(searchTerm.trim());
  }

  async updateReward(id: string, reward: Partial<Reward>): Promise<Reward> {
    // Validate threshold points if being updated
    if (reward.threshold_points !== undefined) {
      if (!Number.isInteger(reward.threshold_points) || reward.threshold_points < 0) {
        throw new Error('Threshold points must be a non-negative integer');
      }
    }

    // Check for duplicate name if name is being updated
    if (reward.name) {
      const existing = await this.rewardRepository.findByName(reward.name);
      if (existing && existing.id !== id) {
        throw new Error('A reward with this name already exists');
      }
    }

    return this.update(id, reward);
  }

  async bulkCreateRewards(rewards: Array<Omit<Reward, 'id'>>): Promise<Reward[]> {
    const results: Reward[] = [];

    // Validate all rewards before processing
    for (const reward of rewards) {
      if (!Number.isInteger(reward.threshold_points) || reward.threshold_points < 0) {
        throw new Error('Threshold points must be a non-negative integer');
      }
      const existing = await this.rewardRepository.findByName(reward.name);
      if (existing) {
        throw new Error(`A reward with the name "${reward.name}" already exists`);
      }
    }

    // Process all rewards
    for (const reward of rewards) {
      const created = await this.createReward(new Reward(reward));
      results.push(created);
    }

    return results;
  }
} 