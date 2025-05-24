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
exports.RoutineStepRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const routine_step_model_1 = require("../models/routine-step.model");
const database_error_1 = require("../shared/exceptions/database.error");
let RoutineStepRepository = class RoutineStepRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'routine_steps', routine_step_model_1.RoutineStep);
    }
    async findByRoutineTemplateId(routineTemplateId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('routine_template_id', routineTemplateId)
            .order('step_number', { ascending: true });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_step_model_1.RoutineStep.fromJSON(item));
    }
    async findByStepNumber(routineTemplateId, stepNumber) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('routine_template_id', routineTemplateId)
            .eq('step_number', stepNumber)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? routine_step_model_1.RoutineStep.fromJSON(data) : null;
    }
    async findWithTemplate(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        routine_template:routine_template_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? routine_step_model_1.RoutineStep.fromJSON(data) : null;
    }
    async findAllWithTemplate() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        routine_template:routine_template_id (*)
      `)
            .order('step_number', { ascending: true });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_step_model_1.RoutineStep.fromJSON(item));
    }
    async findAllByTemplateWithDetails(routineTemplateId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        routine_template:routine_template_id (*)
      `)
            .eq('routine_template_id', routineTemplateId)
            .order('step_number', { ascending: true });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_step_model_1.RoutineStep.fromJSON(item));
    }
    async getMaxStepNumber(routineTemplateId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('step_number')
            .eq('routine_template_id', routineTemplateId)
            .order('step_number', { ascending: false })
            .limit(1)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? data.step_number : 0;
    }
    async reorderSteps(routineTemplateId, stepNumber) {
        const { error } = await this.supabase.rpc('reorder_routine_steps', {
            p_routine_template_id: routineTemplateId,
            p_from_step_number: stepNumber
        });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
    }
};
exports.RoutineStepRepository = RoutineStepRepository;
exports.RoutineStepRepository = RoutineStepRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], RoutineStepRepository);
//# sourceMappingURL=routine-step.repository.js.map