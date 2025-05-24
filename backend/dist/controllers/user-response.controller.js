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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseController = void 0;
const common_1 = require("@nestjs/common");
const user_response_service_1 = require("../services/user-response.service");
const user_response_model_1 = require("../models/user-response.model");
let UserResponseController = class UserResponseController {
    constructor(userResponseService) {
        this.userResponseService = userResponseService;
    }
    async createUserResponse(userResponse) {
        try {
            return await this.userResponseService.createUserResponse(userResponse);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkCreateUserResponses(userId, data) {
        try {
            return await this.userResponseService.bulkCreateUserResponses(userId, data.responses);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserResponse(id, includeRelations) {
        try {
            if (includeRelations) {
                const response = await this.userResponseService.findWithRelations(id);
                if (!response)
                    throw new Error('User response not found');
                return response;
            }
            const response = await this.userResponseService.findById(id);
            if (!response)
                throw new Error('User response not found');
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllUserResponses(userId, questionId, optionId, authUserId, includeRelations) {
        try {
            if (userId && questionId) {
                const response = await this.userResponseService.findByUserAndQuestion(userId, questionId);
                return response ? [response] : [];
            }
            if (userId) {
                return await this.userResponseService.findAllByUserWithDetails(userId);
            }
            if (questionId) {
                return await this.userResponseService.findAllByQuestionWithDetails(questionId);
            }
            if (optionId) {
                return await this.userResponseService.findAllByOptionWithDetails(optionId);
            }
            if (authUserId) {
                return await this.userResponseService.findByAuthUserId(authUserId);
            }
            if (includeRelations) {
                return await this.userResponseService.findAllWithRelations();
            }
            return await this.userResponseService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getResponseStatistics(questionId) {
        try {
            return await this.userResponseService.getResponseStatistics(questionId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUserResponse(id, userResponse) {
        try {
            return await this.userResponseService.updateUserResponse(id, userResponse);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUserResponse(id) {
        try {
            await this.userResponseService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.UserResponseController = UserResponseController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof user_response_model_1.UserResponse !== "undefined" && user_response_model_1.UserResponse) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "createUserResponse", null);
__decorate([
    (0, common_1.Post)('bulk/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "bulkCreateUserResponses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "getUserResponse", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('questionId')),
    __param(2, (0, common_1.Query)('optionId')),
    __param(3, (0, common_1.Query)('authUserId')),
    __param(4, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "getAllUserResponses", null);
__decorate([
    (0, common_1.Get)('statistics/question/:questionId'),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "getResponseStatistics", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof user_response_model_1.UserResponse !== "undefined" && user_response_model_1.UserResponse) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "updateUserResponse", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResponseController.prototype, "deleteUserResponse", null);
exports.UserResponseController = UserResponseController = __decorate([
    (0, common_1.Controller)('user-responses'),
    __metadata("design:paramtypes", [user_response_service_1.UserResponseService])
], UserResponseController);
//# sourceMappingURL=user-response.controller.js.map