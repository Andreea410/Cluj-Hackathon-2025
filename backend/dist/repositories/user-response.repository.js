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
exports.UserResponseRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const user_response_model_1 = require("../models/user-response.model");
const database_error_1 = require("../shared/exceptions/database.error");
let UserResponseRepository = class UserResponseRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'user_responses', user_response_model_1.UserResponse);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findByQuestionId(questionId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('question_id', questionId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findByOptionId(optionId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('option_id', optionId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findByAuthUserId(authUserId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('auth_user_id', authUserId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findByUserAndQuestion(userId, questionId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('question_id', questionId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_response_model_1.UserResponse.fromJSON(data) : null;
    }
    async findWithRelations(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        question:question_id (*),
        option:option_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_response_model_1.UserResponse.fromJSON(data) : null;
    }
    async findAllWithRelations() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        question:question_id (*),
        option:option_id (*)
      `)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findAllByUserWithDetails(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        question:question_id (*),
        option:option_id (*)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findAllByQuestionWithDetails(questionId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        option:option_id (*)
      `)
            .eq('question_id', questionId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async findAllByOptionWithDetails(optionId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        question:question_id (*)
      `)
            .eq('option_id', optionId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_response_model_1.UserResponse.fromJSON(item));
    }
    async countResponsesByOption(questionId) {
        const { data, error } = await this.supabase
            .rpc('count_responses_by_option', { question_id: questionId });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.reduce((acc, curr) => ({
            ...acc,
            [curr.option_id]: parseInt(curr.count)
        }), {});
    }
};
exports.UserResponseRepository = UserResponseRepository;
exports.UserResponseRepository = UserResponseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UserResponseRepository);
//# sourceMappingURL=user-response.repository.js.map