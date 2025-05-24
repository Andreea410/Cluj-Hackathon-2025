import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import { Reward } from '../models/reward.model';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async createReward(@Body() reward: Reward): Promise<Reward> {
    try {
      return await this.rewardService.createReward(reward);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk')
  async bulkCreateRewards(
    @Body() data: { rewards: Array<Omit<Reward, 'id'>> }
  ): Promise<Reward[]> {
    try {
      return await this.rewardService.bulkCreateRewards(data.rewards);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getReward(@Param('id') id: string): Promise<Reward> {
    try {
      const reward = await this.rewardService.findById(id);
      if (!reward) throw new Error('Reward not found');
      return reward;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllRewards(
    @Query('minPoints') minPoints?: number,
    @Query('maxPoints') maxPoints?: number,
    @Query('userPoints') userPoints?: number,
    @Query('search') search?: string
  ): Promise<Reward[]> {
    try {
      if (minPoints !== undefined && maxPoints !== undefined) {
        return await this.rewardService.findByThresholdRange(Number(minPoints), Number(maxPoints));
      }
      if (userPoints !== undefined) {
        return await this.rewardService.findAvailableRewards(Number(userPoints));
      }
      if (search) {
        return await this.rewardService.searchRewards(search);
      }
      return await this.rewardService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('name/:name')
  async getRewardByName(@Param('name') name: string): Promise<Reward> {
    try {
      const reward = await this.rewardService.findByName(name);
      if (!reward) throw new Error('Reward not found');
      return reward;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateReward(
    @Param('id') id: string,
    @Body() reward: Partial<Reward>
  ): Promise<Reward> {
    try {
      return await this.rewardService.updateReward(id, reward);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteReward(@Param('id') id: string): Promise<void> {
    try {
      await this.rewardService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 