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
exports.RewardService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const reward_model_1 = require("../models/reward.model");
let RewardService = class RewardService extends base_service_1.BaseService {
    constructor(rewardRepository) {
        super(rewardRepository);
        this.rewardRepository = rewardRepository;
    }
    async createReward(reward) {
        if (!Number.isInteger(reward.threshold_points) || reward.threshold_points < 0) {
            throw new Error('Threshold points must be a non-negative integer');
        }
        const existing = await this.rewardRepository.findByName(reward.name);
        if (existing) {
            throw new Error('A reward with this name already exists');
        }
        return this.create(reward);
    }
    async findByThresholdRange(minPoints, maxPoints) {
        if (!Number.isInteger(minPoints) || !Number.isInteger(maxPoints)) {
            throw new Error('Points must be integer values');
        }
        if (minPoints > maxPoints) {
            throw new Error('Minimum points cannot be greater than maximum points');
        }
        return this.rewardRepository.findByThresholdRange(minPoints, maxPoints);
    }
    async findAvailableRewards(userPoints) {
        if (!Number.isInteger(userPoints) || userPoints < 0) {
            throw new Error('User points must be a non-negative integer');
        }
        return this.rewardRepository.findAvailableRewards(userPoints);
    }
    async findByName(name) {
        return this.rewardRepository.findByName(name);
    }
    async searchRewards(searchTerm) {
        if (!searchTerm || searchTerm.trim().length === 0) {
            throw new Error('Search term cannot be empty');
        }
        return this.rewardRepository.searchRewards(searchTerm.trim());
    }
    async updateReward(id, reward) {
        if (reward.threshold_points !== undefined) {
            if (!Number.isInteger(reward.threshold_points) || reward.threshold_points < 0) {
                throw new Error('Threshold points must be a non-negative integer');
            }
        }
        if (reward.name) {
            const existing = await this.rewardRepository.findByName(reward.name);
            if (existing && existing.id !== id) {
                throw new Error('A reward with this name already exists');
            }
        }
        return this.update(id, reward);
    }
    async bulkCreateRewards(rewards) {
        const results = [];
        for (const reward of rewards) {
            if (!Number.isInteger(reward.threshold_points) || reward.threshold_points < 0) {
                throw new Error('Threshold points must be a non-negative integer');
            }
            const existing = await this.rewardRepository.findByName(reward.name);
            if (existing) {
                throw new Error(`A reward with the name "${reward.name}" already exists`);
            }
        }
        for (const reward of rewards) {
            const created = await this.createReward(new reward_model_1.Reward(reward));
            results.push(created);
        }
        return results;
    }
};
exports.RewardService = RewardService;
exports.RewardService = RewardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RewardService);
//# sourceMappingURL=reward.service.js.map