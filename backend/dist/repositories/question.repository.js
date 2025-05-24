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
exports.QuestionRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const question_model_1 = require("../models/question.model");
const database_error_1 = require("../shared/exceptions/database.error");
let QuestionRepository = class QuestionRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'questions', question_model_1.Question);
    }
    async findByFieldKey(fieldKey) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('field_key', fieldKey)
            .order('id');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => question_model_1.Question.fromJSON(item));
    }
    async findByText(text) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('text', `%${text}%`)
            .order('id');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => question_model_1.Question.fromJSON(item));
    }
    async searchQuestions(query) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .or(`text.ilike.%${query}%,field_key.ilike.%${query}%`)
            .order('id');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => question_model_1.Question.fromJSON(item));
    }
};
exports.QuestionRepository = QuestionRepository;
exports.QuestionRepository = QuestionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], QuestionRepository);
//# sourceMappingURL=question.repository.js.map