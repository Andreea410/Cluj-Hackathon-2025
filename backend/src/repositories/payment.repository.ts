import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPaymentRepository } from './interfaces/payment.repository.interface';
import { Payment } from '../models/payment.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class PaymentRepository extends BaseSupabaseRepository<Payment> implements IPaymentRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'payments', Payment);
  }

  async findByOrderId(orderId: string): Promise<Payment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('order_id', orderId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Payment.fromJSON(item));
  }

  async findByStripeChargeId(stripeChargeId: string): Promise<Payment | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('stripe_charge_id', stripeChargeId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Payment.fromJSON(data) : null;
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('paid_at', startDate.toISOString())
      .lte('paid_at', endDate.toISOString())
      .order('paid_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Payment.fromJSON(item));
  }

  async findWithOrder(id: string): Promise<Payment | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        order:order_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Payment.fromJSON(data) : null;
  }

  async findAllWithOrders(): Promise<Payment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        order:order_id (*)
      `)
      .order('paid_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Payment.fromJSON(item));
  }
} 