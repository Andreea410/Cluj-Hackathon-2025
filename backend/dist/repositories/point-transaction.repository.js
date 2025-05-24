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
exports.PointTransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const point_transaction_model_1 = require("../models/point-transaction.model");
const database_error_1 = require("../shared/exceptions/database.error");
let PointTransactionRepository = class PointTransactionRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'point_transactions', point_transaction_model_1.PointTransaction);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => point_transaction_model_1.PointTransaction.fromJSON(item));
    }
    async findByAuthUserId(authUserId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('auth_user_id', authUserId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => point_transaction_model_1.PointTransaction.fromJSON(item));
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
        return data ? point_transaction_model_1.PointTransaction.fromJSON(data) : null;
    }
    async findAllWithUser() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*)
      `)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => point_transaction_model_1.PointTransaction.fromJSON(item));
    }
    async findAllByUserWithDetails(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => point_transaction_model_1.PointTransaction.fromJSON(item));
    }
    async getTotalPointsByUser(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('points')
            .eq('user_id', userId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.reduce((total, transaction) => total + transaction.points, 0);
    }
};
exports.PointTransactionRepository = PointTransactionRepository;
exports.PointTransactionRepository = PointTransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PointTransactionRepository);
//# sourceMappingURL=point-transaction.repository.js.map