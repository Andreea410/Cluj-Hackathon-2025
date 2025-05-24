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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let QuestionService = class QuestionService extends base_service_1.BaseService {
    constructor(questionRepository) {
        super(questionRepository);
        this.questionRepository = questionRepository;
    }
    async createQuestion(question) {
        if (!question.text) {
            throw new Error('Question text is required');
        }
        if (!question.field_key) {
            throw new Error('Field key is required');
        }
        return this.create(question);
    }
    async updateQuestion(id, question) {
        if (question.text === '') {
            throw new Error('Question text cannot be empty');
        }
        if (question.field_key === '') {
            throw new Error('Field key cannot be empty');
        }
        return this.update(id, question);
    }
    async getQuestionsByFieldKey(fieldKey) {
        return this.questionRepository.findByFieldKey(fieldKey);
    }
    async searchQuestions(query) {
        if (!query) {
            return this.findAll();
        }
        return this.questionRepository.searchQuestions(query);
    }
    async findByText(text) {
        return this.questionRepository.findByText(text);
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], QuestionService);
//# sourceMappingURL=question.service.js.map