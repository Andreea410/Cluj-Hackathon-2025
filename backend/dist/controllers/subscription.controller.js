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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("../services/subscription.service");
const subscription_model_1 = require("../models/subscription.model");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async createSubscription(subscription) {
        try {
            return await this.subscriptionService.createSubscription(subscription);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getSubscription(id, includeRelations) {
        try {
            if (includeRelations) {
                const subscription = await this.subscriptionService.findWithRelations(id);
                if (!subscription)
                    throw new Error('Subscription not found');
                return subscription;
            }
            return await this.subscriptionService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllSubscriptions(userId, planId, authUserId, status, startDate, endDate, activeOnly, includeRelations) {
        try {
            if (userId) {
                return await this.subscriptionService.findByUserId(userId);
            }
            if (planId) {
                return await this.subscriptionService.findByPlanId(planId);
            }
            if (authUserId) {
                return await this.subscriptionService.findByAuthUserId(authUserId);
            }
            if (status) {
                return await this.subscriptionService.findByStatus(status);
            }
            if (startDate && endDate) {
                return await this.subscriptionService.findByDateRange(new Date(startDate), new Date(endDate));
            }
            if (activeOnly) {
                return await this.subscriptionService.findActiveSubscriptions();
            }
            if (includeRelations) {
                return await this.subscriptionService.findAllWithRelations();
            }
            return await this.subscriptionService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateSubscription(id, subscription) {
        try {
            return await this.subscriptionService.updateSubscription(id, subscription);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async cancelSubscription(id) {
        try {
            return await this.subscriptionService.cancelSubscription(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteSubscription(id) {
        try {
            await this.subscriptionService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_model_1.Subscription]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSubscription", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('planId')),
    __param(2, (0, common_1.Query)('authUserId')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('endDate')),
    __param(6, (0, common_1.Query)('activeOnly')),
    __param(7, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllSubscriptions", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateSubscription", null);
__decorate([
    (0, common_1.Put)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "cancelSubscription", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteSubscription", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map