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
exports.RoutineTemplateRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const routine_template_model_1 = require("../models/routine-template.model");
const database_error_1 = require("../shared/exceptions/database.error");
let RoutineTemplateRepository = class RoutineTemplateRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'routine_templates', routine_template_model_1.RoutineTemplate);
    }
    async findByName(name) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('name', `%${name}%`)
            .order('name');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_template_model_1.RoutineTemplate.fromJSON(item));
    }
    async findByNameExact(name) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('name', name)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? routine_template_model_1.RoutineTemplate.fromJSON(data) : null;
    }
    async searchTemplates(query) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('name');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => routine_template_model_1.RoutineTemplate.fromJSON(item));
    }
};
exports.RoutineTemplateRepository = RoutineTemplateRepository;
exports.RoutineTemplateRepository = RoutineTemplateRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], RoutineTemplateRepository);
//# sourceMappingURL=routine-template.repository.js.map