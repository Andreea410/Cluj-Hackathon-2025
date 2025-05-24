import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Subscription } from '../models/subscription.model';
import { ISubscriptionRepository } from '../repositories/interfaces/subscription.repository.interface';

@Injectable()
export class SubscriptionService extends BaseService<Subscription> {
  constructor(private readonly subscriptionRepository: ISubscriptionRepository) {
    super(subscriptionRepository);
  }

  async createSubscription(subscription: Subscription): Promise<Subscription> {
    // Set default status if not provided
    if (!subscription.status) {
      subscription.status = 'active';
    }
    
    // Validate subscription dates
    this.validateDates(subscription.start_date, subscription.end_date);
    
    return this.create(subscription);
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.findByUserId(userId);
  }

  async findByPlanId(planId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.findByPlanId(planId);
  }

  async findByAuthUserId(authUserId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.findByAuthUserId(authUserId);
  }

  async findByStatus(status: string): Promise<Subscription[]> {
    return this.subscriptionRepository.findByStatus(status);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Subscription[]> {
    return this.subscriptionRepository.findByDateRange(startDate, endDate);
  }

  async findActiveSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionRepository.findActiveSubscriptions();
  }

  async findWithRelations(id: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<Subscription[]> {
    return this.subscriptionRepository.findAllWithRelations();
  }

  async updateSubscription(id: string, subscription: Partial<Subscription>): Promise<Subscription> {
    // Don't allow modification of user_id or plan_id for data integrity
    const { user_id, plan_id, ...updateData } = subscription;

    // If updating dates, validate them
    if (updateData.start_date || updateData.end_date) {
      const current = await this.findById(id);
      this.validateDates(
        updateData.start_date || current.start_date,
        updateData.end_date || current.end_date
      );
    }

    return this.update(id, updateData);
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    return this.update(id, {
      status: 'cancelled',
      end_date: new Date()
    });
  }

  private validateDates(startDate: Date, endDate?: Date): void {
    const start = new Date(startDate);
    
    if (endDate) {
      const end = new Date(endDate);
      if (end < start) {
        throw new Error('End date cannot be before start date');
      }
    }

    if (start < new Date()) {
      throw new Error('Start date cannot be in the past');
    }
  }
} 