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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("../services/payment.service");
const payment_model_1 = require("../models/payment.model");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(payment) {
        try {
            const isValid = await this.paymentService.verifyStripePayment(payment.stripe_charge_id);
            if (!isValid) {
                throw new Error('Invalid or failed Stripe payment');
            }
            return await this.paymentService.createPayment(payment);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPayment(id, includeOrder) {
        try {
            if (includeOrder) {
                const payment = await this.paymentService.findWithOrder(id);
                if (!payment)
                    throw new Error('Payment not found');
                return payment;
            }
            return await this.paymentService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllPayments(orderId, stripeChargeId, startDate, endDate, includeOrders) {
        try {
            if (orderId) {
                return await this.paymentService.findByOrderId(orderId);
            }
            if (stripeChargeId) {
                return await this.paymentService.findByStripeChargeId(stripeChargeId);
            }
            if (startDate && endDate) {
                return await this.paymentService.findByDateRange(new Date(startDate), new Date(endDate));
            }
            if (includeOrders) {
                return await this.paymentService.findAllWithOrders();
            }
            return await this.paymentService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyPayment(stripeChargeId) {
        try {
            const verified = await this.paymentService.verifyStripePayment(stripeChargeId);
            return { verified };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_model_1.Payment]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPayment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('orderId')),
    __param(1, (0, common_1.Query)('stripeChargeId')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('includeOrders')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)('verify/:stripeChargeId'),
    __param(0, (0, common_1.Param)('stripeChargeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "verifyPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map