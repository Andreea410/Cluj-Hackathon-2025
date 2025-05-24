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
exports.IngredientSideEffectRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const ingredient_side_effect_model_1 = require("../models/ingredient-side-effect.model");
const database_error_1 = require("../shared/exceptions/database.error");
let IngredientSideEffectRepository = class IngredientSideEffectRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'ingredient_side_effects', ingredient_side_effect_model_1.IngredientSideEffect);
    }
    async findByIngredientId(ingredientId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('ingredient_id', ingredientId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(item));
    }
    async findBySideEffectId(sideEffectId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('side_effect_id', sideEffectId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(item));
    }
    async findByIngredientAndSideEffect(ingredientId, sideEffectId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('ingredient_id', ingredientId)
            .eq('side_effect_id', sideEffectId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(data) : null;
    }
    async findWithRelations(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        ingredient:ingredient_id (*),
        side_effect:side_effect_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(data) : null;
    }
    async findAllWithRelations() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        ingredient:ingredient_id (*),
        side_effect:side_effect_id (*)
      `);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(item));
    }
    async findAllByIngredientWithSideEffects(ingredientId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        side_effect:side_effect_id (*)
      `)
            .eq('ingredient_id', ingredientId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(item));
    }
    async findAllBySideEffectWithIngredients(sideEffectId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        ingredient:ingredient_id (*)
      `)
            .eq('side_effect_id', sideEffectId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_side_effect_model_1.IngredientSideEffect.fromJSON(item));
    }
};
exports.IngredientSideEffectRepository = IngredientSideEffectRepository;
exports.IngredientSideEffectRepository = IngredientSideEffectRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], IngredientSideEffectRepository);
//# sourceMappingURL=ingredient-side-effect.repository.js.map