import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from '../models/subscription.model';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createSubscription(@Body() subscription: Subscription): Promise<Subscription> {
    try {
      return await this.subscriptionService.createSubscription(subscription);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getSubscription(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<Subscription> {
    try {
      if (includeRelations) {
        const subscription = await this.subscriptionService.findWithRelations(id);
        if (!subscription) throw new Error('Subscription not found');
        return subscription;
      }
      return await this.subscriptionService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllSubscriptions(
    @Query('userId') userId?: string,
    @Query('planId') planId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('activeOnly') activeOnly?: boolean,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<Subscription[]> {
    try {
      if (userId) {
        return await this.subscriptionService.findByUserId(userId);
      }
      if (planId) {
        return await this.subscriptionService.findByPlanId(planId);
      }
      if (authUserId) {
        return await this.subscriptionService.findByAuthUserId(authUserId);
      }
      if (status) {
        return await this.subscriptionService.findByStatus(status);
      }
      if (startDate && endDate) {
        return await this.subscriptionService.findByDateRange(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (activeOnly) {
        return await this.subscriptionService.findActiveSubscriptions();
      }
      if (includeRelations) {
        return await this.subscriptionService.findAllWithRelations();
      }
      return await this.subscriptionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateSubscription(
    @Param('id') id: string,
    @Body() subscription: Partial<Subscription>
  ): Promise<Subscription> {
    try {
      return await this.subscriptionService.updateSubscription(id, subscription);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/cancel')
  async cancelSubscription(@Param('id') id: string): Promise<Subscription> {
    try {
      return await this.subscriptionService.cancelSubscription(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: string): Promise<void> {
    try {
      await this.subscriptionService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 