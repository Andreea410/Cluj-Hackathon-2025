import { BaseService } from './base.service';
import { Subscription } from '../models/subscription.model';
import { ISubscriptionRepository } from '../repositories/interfaces/subscription.repository.interface';
export declare class SubscriptionService extends BaseService<Subscription> {
    private readonly subscriptionRepository;
    constructor(subscriptionRepository: ISubscriptionRepository);
    createSubscription(subscription: Subscription): Promise<Subscription>;
    findByUserId(userId: string): Promise<Subscription[]>;
    findByPlanId(planId: string): Promise<Subscription[]>;
    findByAuthUserId(authUserId: string): Promise<Subscription[]>;
    findByStatus(status: string): Promise<Subscription[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Subscription[]>;
    findActiveSubscriptions(): Promise<Subscription[]>;
    findWithRelations(id: string): Promise<Subscription | null>;
    findAllWithRelations(): Promise<Subscription[]>;
    updateSubscription(id: string, subscription: Partial<Subscription>): Promise<Subscription>;
    cancelSubscription(id: string): Promise<Subscription>;
    private validateDates;
}
