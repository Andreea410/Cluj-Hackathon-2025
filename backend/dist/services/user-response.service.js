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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const user_response_model_1 = require("../models/user-response.model");
const user_response_repository_1 = require("../repositories/user-response.repository");
let UserResponseService = class UserResponseService extends base_service_1.BaseService {
    constructor(userResponseRepository) {
        super(userResponseRepository);
        this.userResponseRepository = userResponseRepository;
    }
    async createUserResponse(userResponse) {
        const existing = await this.userResponseRepository.findByUserAndQuestion(userResponse.user_id, userResponse.question_id);
        if (existing) {
            throw new Error('User has already responded to this question');
        }
        return this.create(userResponse);
    }
    async findByUserId(userId) {
        return this.userResponseRepository.findByUserId(userId);
    }
    async findByQuestionId(questionId) {
        return this.userResponseRepository.findByQuestionId(questionId);
    }
    async findByOptionId(optionId) {
        return this.userResponseRepository.findByOptionId(optionId);
    }
    async findByAuthUserId(authUserId) {
        return this.userResponseRepository.findByAuthUserId(authUserId);
    }
    async findByUserAndQuestion(userId, questionId) {
        return this.userResponseRepository.findByUserAndQuestion(userId, questionId);
    }
    async findWithRelations(id) {
        return this.userResponseRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.userResponseRepository.findAllWithRelations();
    }
    async findAllByUserWithDetails(userId) {
        return this.userResponseRepository.findAllByUserWithDetails(userId);
    }
    async findAllByQuestionWithDetails(questionId) {
        return this.userResponseRepository.findAllByQuestionWithDetails(questionId);
    }
    async findAllByOptionWithDetails(optionId) {
        return this.userResponseRepository.findAllByOptionWithDetails(optionId);
    }
    async updateUserResponse(id, userResponse) {
        const existing = await this.findById(id);
        if (!existing) {
            throw new Error('User response not found');
        }
        if ((userResponse.user_id !== existing.user_id ||
            userResponse.question_id !== existing.question_id) &&
            await this.findByUserAndQuestion(userResponse.user_id, userResponse.question_id)) {
            throw new Error('User has already responded to this question');
        }
        return this.update(id, userResponse);
    }
    async getResponseStatistics(questionId) {
        const optionCounts = await this.userResponseRepository.countResponsesByOption(questionId);
        const totalResponses = Object.values(optionCounts).reduce((sum, count) => sum + count, 0);
        const optionPercentages = Object.entries(optionCounts).reduce((acc, [optionId, count]) => ({
            ...acc,
            [optionId]: totalResponses > 0 ? (count / totalResponses) * 100 : 0
        }), {});
        return {
            totalResponses,
            optionCounts,
            optionPercentages
        };
    }
    async bulkCreateUserResponses(userId, responses) {
        const results = [];
        for (const response of responses) {
            try {
                const userResponse = await this.createUserResponse(new user_response_model_1.UserResponse({
                    user_id: userId,
                    question_id: response.questionId,
                    option_id: response.optionId
                }));
                results.push(userResponse);
            }
            catch (error) {
                if (!error.message.includes('already responded')) {
                    throw error;
                }
            }
        }
        return results;
    }
};
exports.UserResponseService = UserResponseService;
exports.UserResponseService = UserResponseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_response_repository_1.UserResponseRepository !== "undefined" && user_response_repository_1.UserResponseRepository) === "function" ? _a : Object])
], UserResponseService);
//# sourceMappingURL=user-response.service.js.map