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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let SubscriptionService = class SubscriptionService extends base_service_1.BaseService {
    constructor(subscriptionRepository) {
        super(subscriptionRepository);
        this.subscriptionRepository = subscriptionRepository;
    }
    async createSubscription(subscription) {
        if (!subscription.status) {
            subscription.status = 'active';
        }
        this.validateDates(subscription.start_date, subscription.end_date);
        return this.create(subscription);
    }
    async findByUserId(userId) {
        return this.subscriptionRepository.findByUserId(userId);
    }
    async findByPlanId(planId) {
        return this.subscriptionRepository.findByPlanId(planId);
    }
    async findByAuthUserId(authUserId) {
        return this.subscriptionRepository.findByAuthUserId(authUserId);
    }
    async findByStatus(status) {
        return this.subscriptionRepository.findByStatus(status);
    }
    async findByDateRange(startDate, endDate) {
        return this.subscriptionRepository.findByDateRange(startDate, endDate);
    }
    async findActiveSubscriptions() {
        return this.subscriptionRepository.findActiveSubscriptions();
    }
    async findWithRelations(id) {
        return this.subscriptionRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.subscriptionRepository.findAllWithRelations();
    }
    async updateSubscription(id, subscription) {
        const { user_id, plan_id, ...updateData } = subscription;
        if (updateData.start_date || updateData.end_date) {
            const current = await this.findById(id);
            this.validateDates(updateData.start_date || current.start_date, updateData.end_date || current.end_date);
        }
        return this.update(id, updateData);
    }
    async cancelSubscription(id) {
        return this.update(id, {
            status: 'cancelled',
            end_date: new Date()
        });
    }
    validateDates(startDate, endDate) {
        const start = new Date(startDate);
        if (endDate) {
            const end = new Date(endDate);
            if (end < start) {
                throw new Error('End date cannot be before start date');
            }
        }
        if (start < new Date()) {
            throw new Error('Start date cannot be in the past');
        }
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map