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
exports.SideEffectRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const side_effect_model_1 = require("../models/side-effect.model");
const database_error_1 = require("../shared/exceptions/database.error");
let SideEffectRepository = class SideEffectRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'side_effects', side_effect_model_1.SideEffect);
    }
    async findByName(name) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('name', name)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? side_effect_model_1.SideEffect.fromJSON(data) : null;
    }
    async searchByName(query) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('name', `%${query}%`)
            .order('name');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => side_effect_model_1.SideEffect.fromJSON(item));
    }
    async findByNameOrDescription(query) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .order('name');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => side_effect_model_1.SideEffect.fromJSON(item));
    }
};
exports.SideEffectRepository = SideEffectRepository;
exports.SideEffectRepository = SideEffectRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], SideEffectRepository);
//# sourceMappingURL=side-effect.repository.js.map