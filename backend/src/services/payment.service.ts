import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Payment } from '../models/payment.model';
import { IPaymentRepository } from '../repositories/interfaces/payment.repository.interface';
import Stripe from 'stripe';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  private stripe: Stripe;

  constructor(
    private readonly paymentRepository: IPaymentRepository,
  ) {
    super(paymentRepository);
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16'
    });
  }

  async createPayment(payment: Payment): Promise<Payment> {
    // Validate stripe charge ID format
    this.validateStripeChargeId(payment.stripe_charge_id);
    
    // Set paid_at if not provided
    if (!payment.paid_at) {
      payment.paid_at = new Date();
    }
    
    return this.create(payment);
  }

  async findByOrderId(orderId: string): Promise<Payment[]> {
    return this.paymentRepository.findByOrderId(orderId);
  }

  async findByStripeChargeId(stripeChargeId: string): Promise<Payment | null> {
    return this.paymentRepository.findByStripeChargeId(stripeChargeId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]> {
    return this.paymentRepository.findByDateRange(startDate, endDate);
  }

  async findWithOrder(id: string): Promise<Payment | null> {
    return this.paymentRepository.findWithOrder(id);
  }

  async findAllWithOrders(): Promise<Payment[]> {
    return this.paymentRepository.findAllWithOrders();
  }

  async verifyStripePayment(stripeChargeId: string): Promise<boolean> {
    try {
      const charge = await this.stripe.charges.retrieve(stripeChargeId);
      return charge.status === 'succeeded';
    } catch (error) {
      throw new Error(`Failed to verify Stripe payment: ${error.message}`);
    }
  }

  private validateStripeChargeId(stripeChargeId: string): void {
    // Basic validation for Stripe charge ID format
    if (!stripeChargeId.startsWith('ch_')) {
      throw new Error('Invalid Stripe charge ID format');
    }
  }
} 