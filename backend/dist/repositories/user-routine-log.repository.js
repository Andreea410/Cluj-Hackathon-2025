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
exports.UserRoutineLogRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const user_routine_log_model_1 = require("../models/user-routine-log.model");
const database_error_1 = require("../shared/exceptions/database.error");
let UserRoutineLogRepository = class UserRoutineLogRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'user_routine_logs', user_routine_log_model_1.UserRoutineLog);
    }
    async findByUserRoutineId(userRoutineId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_routine_id', userRoutineId)
            .order('log_date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async findByAuthUserId(authUserId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('auth_user_id', authUserId)
            .order('log_date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async findByUserRoutineAndDate(userRoutineId, logDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_routine_id', userRoutineId)
            .eq('log_date', logDate.toISOString().split('T')[0])
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_routine_log_model_1.UserRoutineLog.fromJSON(data) : null;
    }
    async findWithRelations(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user_routine:user_routine_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_routine_log_model_1.UserRoutineLog.fromJSON(data) : null;
    }
    async findAllWithRelations() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user_routine:user_routine_id (*)
      `)
            .order('log_date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async findAllByUserRoutineWithDetails(userRoutineId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user_routine:user_routine_id (*)
      `)
            .eq('user_routine_id', userRoutineId)
            .order('log_date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async findAllBetweenDates(startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('log_date', startDate.toISOString().split('T')[0])
            .lte('log_date', endDate.toISOString().split('T')[0])
            .order('log_date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async findAllByUserRoutineBetweenDates(userRoutineId, startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_routine_id', userRoutineId)
            .gte('log_date', startDate.toISOString().split('T')[0])
            .lte('log_date', endDate.toISOString().split('T')[0])
            .order('log_date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async getCompletionStats(userRoutineId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('completed_steps')
            .eq('user_routine_id', userRoutineId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        const totalLogs = data.length;
        const totalSteps = data.reduce((sum, log) => sum + log.completed_steps, 0);
        const averageCompletedSteps = totalLogs > 0 ? totalSteps / totalLogs : 0;
        const completionRate = totalLogs > 0 ? (totalSteps / (totalLogs * 100)) * 100 : 0;
        return {
            totalLogs,
            averageCompletedSteps,
            completionRate
        };
    }
    async findRecentLogs(limit = 10) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user_routine:user_routine_id (*)
      `)
            .order('log_date', { ascending: false })
            .limit(limit);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
    async findByDate(logDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('log_date', logDate.toISOString().split('T')[0])
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_routine_log_model_1.UserRoutineLog.fromJSON(item));
    }
};
exports.UserRoutineLogRepository = UserRoutineLogRepository;
exports.UserRoutineLogRepository = UserRoutineLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UserRoutineLogRepository);
//# sourceMappingURL=user-routine-log.repository.js.map