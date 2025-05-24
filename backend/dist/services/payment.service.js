"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const payment_repository_1 = require("../repositories/payment.repository");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
let PaymentService = class PaymentService extends base_service_1.BaseService {
    constructor(paymentRepository, configService) {
        super(paymentRepository);
        this.paymentRepository = paymentRepository;
        this.configService = configService;
    }
    onModuleInit() {
        const stripeKey = this.configService.get('STRIPE_SECRET_KEY');
        if (!stripeKey) {
            throw new Error('STRIPE_SECRET_KEY is not configured');
        }
        this.stripe = new stripe_1.default(stripeKey, {
            apiVersion: '2025-04-30.basil'
        });
    }
    async createPayment(payment) {
        this.validateStripeChargeId(payment.stripe_charge_id);
        if (!payment.paid_at) {
            payment.paid_at = new Date();
        }
        return this.create(payment);
    }
    async findByOrderId(orderId) {
        return this.paymentRepository.findByOrderId(orderId);
    }
    async findByStripeChargeId(stripeChargeId) {
        return this.paymentRepository.findByStripeChargeId(stripeChargeId);
    }
    async findByDateRange(startDate, endDate) {
        return this.paymentRepository.findByDateRange(startDate, endDate);
    }
    async findWithOrder(id) {
        return this.paymentRepository.findWithOrder(id);
    }
    async findAllWithOrders() {
        return this.paymentRepository.findAllWithOrders();
    }
    async verifyStripePayment(stripeChargeId) {
        try {
            const charge = await this.stripe.charges.retrieve(stripeChargeId);
            return charge.status === 'succeeded';
        }
        catch (error) {
            throw new Error(`Failed to verify Stripe payment: ${error.message}`);
        }
    }
    validateStripeChargeId(stripeChargeId) {
        if (!stripeChargeId.startsWith('ch_')) {
            throw new Error('Invalid Stripe charge ID format');
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_repository_1.PaymentRepository,
        config_1.ConfigService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map