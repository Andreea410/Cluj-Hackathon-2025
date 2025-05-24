import { IBaseRepository } from './base.repository.interface';
import { Subscription } from '../../models/subscription.model';

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {
  findByUserId(userId: string): Promise<Subscription[]>;
  findByPlanId(planId: string): Promise<Subscription[]>;
  findByAuthUserId(authUserId: string): Promise<Subscription[]>;
  findByStatus(status: string): Promise<Subscription[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Subscription[]>;
  findActiveSubscriptions(): Promise<Subscription[]>;
  findWithRelations(id: string): Promise<Subscription | null>;
  findAllWithRelations(): Promise<Subscription[]>;
} 