import { Controller, Get, Post, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserRewardService } from '../services/user-reward.service';
import { UserReward } from '../models/user-reward.model';

@Controller('user-rewards')
export class UserRewardController {
  constructor(private readonly userRewardService: UserRewardService) {}

  @Post('claim')
  async claimReward(@Body() userReward: UserReward): Promise<UserReward> {
    try {
      return await this.userRewardService.claimReward(userReward);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk-claim/:userId')
  async bulkClaimRewards(
    @Param('userId') userId: string,
    @Body() data: { rewardIds: string[] }
  ): Promise<UserReward[]> {
    try {
      return await this.userRewardService.bulkClaimRewards(userId, data.rewardIds);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserReward(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<UserReward> {
    try {
      if (includeRelations) {
        const reward = await this.userRewardService.findWithRelations(id);
        if (!reward) throw new Error('User reward not found');
        return reward;
      }
      const reward = await this.userRewardService.findById(id);
      if (!reward) throw new Error('User reward not found');
      return reward;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllUserRewards(
    @Query('userId') userId?: string,
    @Query('rewardId') rewardId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('includeRelations') includeRelations?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ): Promise<UserReward[]> {
    try {
      if (startDate && endDate) {
        return await this.userRewardService.findAllClaimedBetweenDates(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (userId && rewardId) {
        const reward = await this.userRewardService.findByUserAndReward(userId, rewardId);
        return reward ? [reward] : [];
      }
      if (userId) {
        return await this.userRewardService.findAllByUserWithDetails(userId);
      }
      if (rewardId) {
        return await this.userRewardService.findAllByRewardWithDetails(rewardId);
      }
      if (authUserId) {
        return await this.userRewardService.findByAuthUserId(authUserId);
      }
      if (includeRelations) {
        return await this.userRewardService.findAllWithRelations();
      }
      return await this.userRewardService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('statistics/reward/:rewardId')
  async getRewardStatistics(@Param('rewardId') rewardId: string) {
    try {
      return await this.userRewardService.getRewardStatistics(rewardId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('check/:userId/:rewardId')
  async checkRewardClaimed(
    @Param('userId') userId: string,
    @Param('rewardId') rewardId: string
  ): Promise<{ claimed: boolean }> {
    try {
      const claimed = await this.userRewardService.hasUserClaimedReward(userId, rewardId);
      return { claimed };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('recent')
  async getRecentClaims(@Query('limit') limit?: number): Promise<UserReward[]> {
    try {
      return await this.userRewardService.getRecentClaims(limit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUserReward(@Param('id') id: string): Promise<void> {
    try {
      await this.userRewardService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 