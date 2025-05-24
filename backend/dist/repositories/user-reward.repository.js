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
exports.UserRewardRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const user_reward_model_1 = require("../models/user-reward.model");
const database_error_1 = require("../shared/exceptions/database.error");
let UserRewardRepository = class UserRewardRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'user_rewards', user_reward_model_1.UserReward);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async findByRewardId(rewardId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('reward_id', rewardId)
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async findByAuthUserId(authUserId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('auth_user_id', authUserId)
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async findByUserAndReward(userId, rewardId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('reward_id', rewardId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_reward_model_1.UserReward.fromJSON(data) : null;
    }
    async findWithRelations(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        reward:reward_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_reward_model_1.UserReward.fromJSON(data) : null;
    }
    async findAllWithRelations() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        reward:reward_id (*)
      `)
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async findAllByUserWithDetails(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        reward:reward_id (*)
      `)
            .eq('user_id', userId)
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async findAllByRewardWithDetails(rewardId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*)
      `)
            .eq('reward_id', rewardId)
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async findAllClaimedBetweenDates(startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('claimed_at', startDate.toISOString())
            .lte('claimed_at', endDate.toISOString())
            .order('claimed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_reward_model_1.UserReward.fromJSON(item));
    }
    async countClaimedRewards(rewardId) {
        const { count, error } = await this.supabase
            .from(this.tableName)
            .select('*', { count: 'exact', head: true })
            .eq('reward_id', rewardId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return count || 0;
    }
};
exports.UserRewardRepository = UserRewardRepository;
exports.UserRewardRepository = UserRewardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UserRewardRepository);
//# sourceMappingURL=user-reward.repository.js.map