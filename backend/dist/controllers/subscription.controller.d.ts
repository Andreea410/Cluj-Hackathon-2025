import { SubscriptionService } from '../services/subscription.service';
import { Subscription } from '../models/subscription.model';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createSubscription(subscription: Subscription): Promise<Subscription>;
    getSubscription(id: string, includeRelations?: boolean): Promise<Subscription>;
    getAllSubscriptions(userId?: string, planId?: string, authUserId?: string, status?: string, startDate?: string, endDate?: string, activeOnly?: boolean, includeRelations?: boolean): Promise<Subscription[]>;
    updateSubscription(id: string, subscription: Partial<Subscription>): Promise<Subscription>;
    cancelSubscription(id: string): Promise<Subscription>;
    deleteSubscription(id: string): Promise<void>;
}
