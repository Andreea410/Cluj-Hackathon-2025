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
exports.SkinQuestionnaireService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const skin_questionnaire_model_1 = require("../models/skin-questionnaire.model");
let SkinQuestionnaireService = class SkinQuestionnaireService extends base_service_1.BaseService {
    constructor(questionnaireRepository) {
        super(questionnaireRepository);
        this.questionnaireRepository = questionnaireRepository;
        this.questions = [
            {
                id: 'skin_type',
                question: 'What is your skin type?',
                options: ['dry', 'oily', 'combination', 'normal', 'sensitive']
            },
            {
                id: 'breakouts',
                question: 'How often do you experience breakouts?',
                options: ['rare', 'occasional', 'frequent', 'constant']
            },
            {
                id: 'concerns',
                question: 'What are your main skin concerns? (Select all that apply)',
                options: ['acne', 'aging', 'dryness', 'oiliness', 'sensitivity', 'hyperpigmentation']
            },
            {
                id: 'allergies',
                question: 'Do you have any known skin allergies?',
                options: ['none', 'fragrance', 'certain ingredients', 'multiple allergies']
            },
            {
                id: 'current_products',
                question: 'What products are you currently using?',
                options: ['cleanser', 'moisturizer', 'sunscreen', 'serum', 'none']
            }
        ];
    }
    getQuestions() {
        return this.questions;
    }
    async submitResponses(userId, responses) {
        this.validateResponses(responses);
        const questionnaire = new skin_questionnaire_model_1.SkinQuestionnaire({
            user_id: userId,
            responses,
            created_at: new Date()
        });
        return this.create(questionnaire);
    }
    validateResponses(responses) {
        const answeredQuestionIds = responses.map(r => r.question_id);
        const requiredQuestionIds = this.questions.map(q => q.id);
        const missingQuestions = requiredQuestionIds.filter(id => !answeredQuestionIds.includes(id));
        if (missingQuestions.length > 0) {
            throw new Error(`Missing answers for questions: ${missingQuestions.join(', ')}`);
        }
        responses.forEach(response => {
            const question = this.questions.find(q => q.id === response.question_id);
            if (!question) {
                throw new Error(`Invalid question ID: ${response.question_id}`);
            }
            if (!question.options.includes(response.answer)) {
                throw new Error(`Invalid answer for question ${response.question_id}`);
            }
        });
    }
};
exports.SkinQuestionnaireService = SkinQuestionnaireService;
exports.SkinQuestionnaireService = SkinQuestionnaireService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SkinQuestionnaireService);
//# sourceMappingURL=skin-questionnaire.service.js.map