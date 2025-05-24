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
exports.AnswerOptionService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const answer_option_repository_1 = require("../repositories/answer-option.repository");
let AnswerOptionService = class AnswerOptionService extends base_service_1.BaseService {
    constructor(answerOptionRepository) {
        super(answerOptionRepository);
        this.answerOptionRepository = answerOptionRepository;
    }
    async createAnswerOption(answerOption) {
        if (!answerOption.question_id) {
            throw new Error('Question ID is required');
        }
        if (!answerOption.value) {
            throw new Error('Answer option value is required');
        }
        const existing = await this.answerOptionRepository.findByQuestionIdAndValue(answerOption.question_id, answerOption.value);
        if (existing) {
            throw new Error('This answer option already exists for the question');
        }
        return this.create(answerOption);
    }
    async updateAnswerOption(id, answerOption) {
        if (answerOption.value === '') {
            throw new Error('Answer option value cannot be empty');
        }
        const existing = await this.findById(id);
        if (answerOption.value) {
            const duplicate = await this.answerOptionRepository.findByQuestionIdAndValue(existing.question_id, answerOption.value);
            if (duplicate && duplicate.id !== id) {
                throw new Error('This answer option already exists for the question');
            }
        }
        return this.update(id, answerOption);
    }
    async getQuestionOptions(questionId) {
        return this.answerOptionRepository.findByQuestionId(questionId);
    }
    async getQuestionWithOptions(questionId) {
        return this.answerOptionRepository.findQuestionWithOptions(questionId);
    }
    async searchByValue(value) {
        return this.answerOptionRepository.findByValue(value);
    }
};
exports.AnswerOptionService = AnswerOptionService;
exports.AnswerOptionService = AnswerOptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answer_option_repository_1.AnswerOptionRepository])
], AnswerOptionService);
//# sourceMappingURL=answer-option.service.js.map