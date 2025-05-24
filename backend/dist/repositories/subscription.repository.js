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
exports.SubscriptionRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const subscription_model_1 = require("../models/subscription.model");
const database_error_1 = require("../shared/exceptions/database.error");
let SubscriptionRepository = class SubscriptionRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'subscriptions', subscription_model_1.Subscription);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
    async findByPlanId(planId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('plan_id', planId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
    async findByAuthUserId(authUserId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('auth_user_id', authUserId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
    async findByStatus(status) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('status', status);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
    async findByDateRange(startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('start_date', startDate.toISOString())
            .lte('end_date', endDate.toISOString());
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
    async findActiveSubscriptions() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('status', 'active')
            .gte('end_date', new Date().toISOString());
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
    async findWithRelations(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        plan:plan_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? subscription_model_1.Subscription.fromJSON(data) : null;
    }
    async findAllWithRelations() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        plan:plan_id (*)
      `);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => subscription_model_1.Subscription.fromJSON(item));
    }
};
exports.SubscriptionRepository = SubscriptionRepository;
exports.SubscriptionRepository = SubscriptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], SubscriptionRepository);
//# sourceMappingURL=subscription.repository.js.map