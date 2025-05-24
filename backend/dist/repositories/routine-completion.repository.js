"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineCompletionRepository = void 0;
const base_supabase_repository_1 = require("./base.supabase.repository");
const routine_completion_model_1 = require("../models/routine-completion.model");
const database_error_1 = require("../errors/database.error");
class RoutineCompletionRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'routine_completions');
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_completion_model_1.RoutineCompletion.fromJSON(item));
    }
    async findByDate(userId, date) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('date', date.toISOString().split('T')[0])
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? routine_completion_model_1.RoutineCompletion.fromJSON(data) : null;
    }
    async updateCompletion(userId, date, updates) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .update(updates)
            .eq('user_id', userId)
            .eq('date', date.toISOString().split('T')[0])
            .select()
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return routine_completion_model_1.RoutineCompletion.fromJSON(data);
    }
    async createCompletion(completion) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .insert(completion.toJSON())
            .select()
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return routine_completion_model_1.RoutineCompletion.fromJSON(data);
    }
}
exports.RoutineCompletionRepository = RoutineCompletionRepository;
//# sourceMappingURL=routine-completion.repository.js.map