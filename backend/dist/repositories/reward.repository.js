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
exports.RewardRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const reward_model_1 = require("../models/reward.model");
const database_error_1 = require("../shared/exceptions/database.error");
let RewardRepository = class RewardRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'rewards', reward_model_1.Reward);
    }
    async findByThresholdRange(minPoints, maxPoints) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('threshold_points', minPoints)
            .lte('threshold_points', maxPoints)
            .order('threshold_points', { ascending: true });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => reward_model_1.Reward.fromJSON(item));
    }
    async findAvailableRewards(userPoints) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .lte('threshold_points', userPoints)
            .order('threshold_points', { ascending: true });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => reward_model_1.Reward.fromJSON(item));
    }
    async findByName(name) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('name', name)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? reward_model_1.Reward.fromJSON(data) : null;
    }
    async searchRewards(searchTerm) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
            .order('threshold_points', { ascending: true });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => reward_model_1.Reward.fromJSON(item));
    }
};
exports.RewardRepository = RewardRepository;
exports.RewardRepository = RewardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], RewardRepository);
//# sourceMappingURL=reward.repository.js.map