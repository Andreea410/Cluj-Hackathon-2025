import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(payment: Payment): Promise<Payment>;
    getPayment(id: string, includeOrder?: boolean): Promise<Payment>;
    getAllPayments(orderId?: string, stripeChargeId?: string, startDate?: string, endDate?: string, includeOrders?: boolean): Promise<Payment[] | Payment | null>;
    verifyPayment(stripeChargeId: string): Promise<{
        verified: boolean;
    }>;
}
