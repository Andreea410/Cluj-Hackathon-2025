import { IBaseRepository } from './base.repository.interface';
import { Payment } from '../../models/payment.model';

export interface IPaymentRepository extends IBaseRepository<Payment> {
  findByOrderId(orderId: string): Promise<Payment[]>;
  findByStripeChargeId(stripeChargeId: string): Promise<Payment | null>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;
  findWithOrder(id: string): Promise<Payment | null>;
  findAllWithOrders(): Promise<Payment[]>;
} 