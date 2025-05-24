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
exports.RoutineAdjustmentRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const routine_adjustment_model_1 = require("../models/routine-adjustment.model");
const database_error_1 = require("../shared/exceptions/database.error");
let RoutineAdjustmentRepository = class RoutineAdjustmentRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'routine_adjustments', routine_adjustment_model_1.RoutineAdjustment);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_adjustment_model_1.RoutineAdjustment.fromJSON(item));
    }
    async findByPhotoAnalysisId(photoAnalysisId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('photo_analysis_id', photoAnalysisId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_adjustment_model_1.RoutineAdjustment.fromJSON(item));
    }
    async findByAuthUserId(authUserId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('auth_user_id', authUserId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_adjustment_model_1.RoutineAdjustment.fromJSON(item));
    }
    async findWithRelations(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        photo_analysis:photo_analysis_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? routine_adjustment_model_1.RoutineAdjustment.fromJSON(data) : null;
    }
    async findAllWithRelations() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        user:user_id (*),
        photo_analysis:photo_analysis_id (*)
      `);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_adjustment_model_1.RoutineAdjustment.fromJSON(item));
    }
};
exports.RoutineAdjustmentRepository = RoutineAdjustmentRepository;
exports.RoutineAdjustmentRepository = RoutineAdjustmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], RoutineAdjustmentRepository);
//# sourceMappingURL=routine-adjustment.repository.js.map