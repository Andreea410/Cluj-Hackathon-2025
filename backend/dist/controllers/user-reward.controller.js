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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRewardController = void 0;
const common_1 = require("@nestjs/common");
const user_reward_service_1 = require("../services/user-reward.service");
const user_reward_model_1 = require("../models/user-reward.model");
let UserRewardController = class UserRewardController {
    constructor(userRewardService) {
        this.userRewardService = userRewardService;
    }
    async claimReward(userReward) {
        try {
            return await this.userRewardService.claimReward(userReward);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkClaimRewards(userId, data) {
        try {
            return await this.userRewardService.bulkClaimRewards(userId, data.rewardIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserReward(id, includeRelations) {
        try {
            if (includeRelations) {
                const reward = await this.userRewardService.findWithRelations(id);
                if (!reward)
                    throw new Error('User reward not found');
                return reward;
            }
            const reward = await this.userRewardService.findById(id);
            if (!reward)
                throw new Error('User reward not found');
            return reward;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllUserRewards(userId, rewardId, authUserId, includeRelations, startDate, endDate) {
        try {
            if (startDate && endDate) {
                return await this.userRewardService.findAllClaimedBetweenDates(new Date(startDate), new Date(endDate));
            }
            if (userId && rewardId) {
                const reward = await this.userRewardService.findByUserAndReward(userId, rewardId);
                return reward ? [reward] : [];
            }
            if (userId) {
                return await this.userRewardService.findAllByUserWithDetails(userId);
            }
            if (rewardId) {
                return await this.userRewardService.findAllByRewardWithDetails(rewardId);
            }
            if (authUserId) {
                return await this.userRewardService.findByAuthUserId(authUserId);
            }
            if (includeRelations) {
                return await this.userRewardService.findAllWithRelations();
            }
            return await this.userRewardService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRewardStatistics(rewardId) {
        try {
            return await this.userRewardService.getRewardStatistics(rewardId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkRewardClaimed(userId, rewardId) {
        try {
            const claimed = await this.userRewardService.hasUserClaimedReward(userId, rewardId);
            return { claimed };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRecentClaims(limit) {
        try {
            return await this.userRewardService.getRecentClaims(limit);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUserReward(id) {
        try {
            await this.userRewardService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.UserRewardController = UserRewardController;
__decorate([
    (0, common_1.Post)('claim'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof user_reward_model_1.UserReward !== "undefined" && user_reward_model_1.UserReward) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "claimReward", null);
__decorate([
    (0, common_1.Post)('bulk-claim/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "bulkClaimRewards", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "getUserReward", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('rewardId')),
    __param(2, (0, common_1.Query)('authUserId')),
    __param(3, (0, common_1.Query)('includeRelations')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean, String, String]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "getAllUserRewards", null);
__decorate([
    (0, common_1.Get)('statistics/reward/:rewardId'),
    __param(0, (0, common_1.Param)('rewardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "getRewardStatistics", null);
__decorate([
    (0, common_1.Get)('check/:userId/:rewardId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('rewardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "checkRewardClaimed", null);
__decorate([
    (0, common_1.Get)('recent'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "getRecentClaims", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRewardController.prototype, "deleteUserReward", null);
exports.UserRewardController = UserRewardController = __decorate([
    (0, common_1.Controller)('user-rewards'),
    __metadata("design:paramtypes", [user_reward_service_1.UserRewardService])
], UserRewardController);
//# sourceMappingURL=user-reward.controller.js.map