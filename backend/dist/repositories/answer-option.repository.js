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
exports.AnswerOptionRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const answer_option_model_1 = require("../models/answer-option.model");
const question_model_1 = require("../models/question.model");
const database_error_1 = require("../shared/exceptions/database.error");
let AnswerOptionRepository = class AnswerOptionRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'answer_options', answer_option_model_1.AnswerOption);
    }
    async findByQuestionId(questionId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('question_id', questionId)
            .order('id');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => answer_option_model_1.AnswerOption.fromJSON(item));
    }
    async findByValue(value) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('value', `%${value}%`)
            .order('id');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => answer_option_model_1.AnswerOption.fromJSON(item));
    }
    async findQuestionWithOptions(questionId) {
        const { data, error } = await this.supabase
            .from('questions')
            .select(`
        *,
        answer_options (*)
      `)
            .eq('id', questionId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        if (!data)
            throw new database_error_1.DatabaseError('Question not found');
        return {
            question: question_model_1.Question.fromJSON(data),
            options: data.answer_options.map(option => answer_option_model_1.AnswerOption.fromJSON(option))
        };
    }
    async findByQuestionIdAndValue(questionId, value) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('question_id', questionId)
            .eq('value', value)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? answer_option_model_1.AnswerOption.fromJSON(data) : null;
    }
};
exports.AnswerOptionRepository = AnswerOptionRepository;
exports.AnswerOptionRepository = AnswerOptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AnswerOptionRepository);
//# sourceMappingURL=answer-option.repository.js.map