import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPaymentRepository } from './interfaces/payment.repository.interface';
import { Payment } from '../models/payment.model';
export declare class PaymentRepository extends BaseSupabaseRepository<Payment> implements IPaymentRepository {
    constructor(supabase: SupabaseClient);
    findByOrderId(orderId: string): Promise<Payment[]>;
    findByStripeChargeId(stripeChargeId: string): Promise<Payment | null>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;
    findWithOrder(id: string): Promise<Payment | null>;
    findAllWithOrders(): Promise<Payment[]>;
}
