import { OnModuleInit } from '@nestjs/common';
import { BaseService } from './base.service';
import { Payment } from '../models/payment.model';
import { PaymentRepository } from '../repositories/payment.repository';
import { ConfigService } from '@nestjs/config';
export declare class PaymentService extends BaseService<Payment> implements OnModuleInit {
    private readonly paymentRepository;
    private readonly configService;
    private stripe;
    constructor(paymentRepository: PaymentRepository, configService: ConfigService);
    onModuleInit(): void;
    createPayment(payment: Payment): Promise<Payment>;
    findByOrderId(orderId: string): Promise<Payment[]>;
    findByStripeChargeId(stripeChargeId: string): Promise<Payment | null>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Payment[]>;
    findWithOrder(id: string): Promise<Payment | null>;
    findAllWithOrders(): Promise<Payment[]>;
    verifyStripePayment(stripeChargeId: string): Promise<boolean>;
    private validateStripeChargeId;
}
