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
exports.AnswerOptionController = void 0;
const common_1 = require("@nestjs/common");
const answer_option_service_1 = require("../services/answer-option.service");
const answer_option_model_1 = require("../models/answer-option.model");
let AnswerOptionController = class AnswerOptionController {
    constructor(answerOptionService) {
        this.answerOptionService = answerOptionService;
    }
    async createAnswerOption(answerOption) {
        try {
            return await this.answerOptionService.createAnswerOption(answerOption);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAnswerOptions(value) {
        try {
            if (value) {
                return await this.answerOptionService.searchByValue(value);
            }
            return await this.answerOptionService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getQuestionOptions(questionId) {
        try {
            return await this.answerOptionService.getQuestionOptions(questionId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getQuestionWithOptions(questionId) {
        try {
            return await this.answerOptionService.getQuestionWithOptions(questionId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAnswerOption(id) {
        try {
            const option = await this.answerOptionService.findById(id);
            if (!option) {
                throw new common_1.HttpException('Answer option not found', common_1.HttpStatus.NOT_FOUND);
            }
            return option;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateAnswerOption(id, answerOption) {
        try {
            return await this.answerOptionService.updateAnswerOption(id, answerOption);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAnswerOption(id) {
        try {
            await this.answerOptionService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.AnswerOptionController = AnswerOptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_option_model_1.AnswerOption]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "createAnswerOption", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "getAnswerOptions", null);
__decorate([
    (0, common_1.Get)('question/:questionId'),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "getQuestionOptions", null);
__decorate([
    (0, common_1.Get)('question/:questionId/with-options'),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "getQuestionWithOptions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "getAnswerOption", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "updateAnswerOption", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerOptionController.prototype, "deleteAnswerOption", null);
exports.AnswerOptionController = AnswerOptionController = __decorate([
    (0, common_1.Controller)('answer-options'),
    __metadata("design:paramtypes", [answer_option_service_1.AnswerOptionService])
], AnswerOptionController);
//# sourceMappingURL=answer-option.controller.js.map