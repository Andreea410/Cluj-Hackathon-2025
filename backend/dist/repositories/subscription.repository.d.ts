import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { ISubscriptionRepository } from './interfaces/subscription.repository.interface';
import { Subscription } from '../models/subscription.model';
export declare class SubscriptionRepository extends BaseSupabaseRepository<Subscription> implements ISubscriptionRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<Subscription[]>;
    findByPlanId(planId: string): Promise<Subscription[]>;
    findByAuthUserId(authUserId: string): Promise<Subscription[]>;
    findByStatus(status: string): Promise<Subscription[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Subscription[]>;
    findActiveSubscriptions(): Promise<Subscription[]>;
    findWithRelations(id: string): Promise<Subscription | null>;
    findAllWithRelations(): Promise<Subscription[]>;
}
