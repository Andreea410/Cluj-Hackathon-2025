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
exports.UserRewardService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const user_reward_model_1 = require("../models/user-reward.model");
let UserRewardService = class UserRewardService extends base_service_1.BaseService {
    constructor(userRewardRepository) {
        super(userRewardRepository);
        this.userRewardRepository = userRewardRepository;
    }
    async claimReward(userReward) {
        const existing = await this.userRewardRepository.findByUserAndReward(userReward.user_id, userReward.reward_id);
        if (existing) {
            throw new Error('User has already claimed this reward');
        }
        userReward.claimed_at = new Date();
        return this.create(userReward);
    }
    async findByUserId(userId) {
        return this.userRewardRepository.findByUserId(userId);
    }
    async findByRewardId(rewardId) {
        return this.userRewardRepository.findByRewardId(rewardId);
    }
    async findByAuthUserId(authUserId) {
        return this.userRewardRepository.findByAuthUserId(authUserId);
    }
    async findByUserAndReward(userId, rewardId) {
        return this.userRewardRepository.findByUserAndReward(userId, rewardId);
    }
    async findWithRelations(id) {
        return this.userRewardRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.userRewardRepository.findAllWithRelations();
    }
    async findAllByUserWithDetails(userId) {
        return this.userRewardRepository.findAllByUserWithDetails(userId);
    }
    async findAllByRewardWithDetails(rewardId) {
        return this.userRewardRepository.findAllByRewardWithDetails(rewardId);
    }
    async findAllClaimedBetweenDates(startDate, endDate) {
        return this.userRewardRepository.findAllClaimedBetweenDates(startDate, endDate);
    }
    async getRewardStatistics(rewardId) {
        const claims = await this.findByRewardId(rewardId);
        const totalClaims = claims.length;
        const claimsByDate = claims.reduce((acc, claim) => {
            const date = claim.claimed_at.toISOString().split('T')[0];
            const existingEntry = acc.find(entry => entry.date === date);
            if (existingEntry) {
                existingEntry.count++;
            }
            else {
                acc.push({ date, count: 1 });
            }
            return acc;
        }, []);
        claimsByDate.sort((a, b) => a.date.localeCompare(b.date));
        return {
            totalClaims,
            claimsByDate
        };
    }
    async bulkClaimRewards(userId, rewardIds) {
        const results = [];
        for (const rewardId of rewardIds) {
            try {
                const userReward = await this.claimReward(new user_reward_model_1.UserReward({
                    user_id: userId,
                    reward_id: rewardId,
                    claimed_at: new Date()
                }));
                results.push(userReward);
            }
            catch (error) {
                if (!error.message.includes('already claimed')) {
                    throw error;
                }
            }
        }
        return results;
    }
    async hasUserClaimedReward(userId, rewardId) {
        const claimed = await this.findByUserAndReward(userId, rewardId);
        return !!claimed;
    }
    async getRecentClaims(limit = 10) {
        const { data, error } = await this.userRewardRepository['supabase']
            .from(this.userRewardRepository['tableName'])
            .select(`
        *,
        user:user_id (*),
        reward:reward_id (*)
      `)
            .order('claimed_at', { ascending: false })
            .limit(limit);
        if (error)
            throw new Error(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
};
exports.UserRewardService = UserRewardService;
exports.UserRewardService = UserRewardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], UserRewardService);
//# sourceMappingURL=user-reward.service.js.map