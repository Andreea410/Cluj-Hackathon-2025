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
exports.AgentLogRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const agent_log_model_1 = require("../models/agent-log.model");
const database_error_1 = require("../shared/exceptions/database.error");
let AgentLogRepository = class AgentLogRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'agent_logs', agent_log_model_1.AgentLog);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => agent_log_model_1.AgentLog.fromJSON(item));
    }
    async findByRole(role) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('role', role)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => agent_log_model_1.AgentLog.fromJSON(item));
    }
    async findByUserAndRole(userId, role) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('role', role)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => agent_log_model_1.AgentLog.fromJSON(item));
    }
    async findWithUser(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? agent_log_model_1.AgentLog.fromJSON(data) : null;
    }
    async findAllWithUsers() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*)
      `)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => agent_log_model_1.AgentLog.fromJSON(item));
    }
    async findLatestByUser(userId, limit) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => agent_log_model_1.AgentLog.fromJSON(item));
    }
};
exports.AgentLogRepository = AgentLogRepository;
exports.AgentLogRepository = AgentLogRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AgentLogRepository);
//# sourceMappingURL=agent-log.repository.js.map