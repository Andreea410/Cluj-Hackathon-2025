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
exports.IngredientBenefitRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const ingredient_benefit_model_1 = require("../models/ingredient-benefit.model");
const benefit_model_1 = require("../models/benefit.model");
const ingredient_model_1 = require("../models/ingredient.model");
const database_error_1 = require("../shared/exceptions/database.error");
let IngredientBenefitRepository = class IngredientBenefitRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'ingredient_benefits', ingredient_benefit_model_1.IngredientBenefit);
    }
    async findByIngredientId(ingredientId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('ingredient_id', ingredientId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_benefit_model_1.IngredientBenefit.fromJSON(item));
    }
    async findByBenefitId(benefitId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('benefit_id', benefitId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_benefit_model_1.IngredientBenefit.fromJSON(item));
    }
    async findByIngredientAndBenefit(ingredientId, benefitId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('ingredient_id', ingredientId)
            .eq('benefit_id', benefitId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? ingredient_benefit_model_1.IngredientBenefit.fromJSON(data) : null;
    }
    async getBenefitsForIngredient(ingredientId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        benefit_id,
        benefits:benefit_id (*)
      `)
            .eq('ingredient_id', ingredientId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => benefit_model_1.Benefit.fromJSON(item.benefits));
    }
    async getIngredientsForBenefit(benefitId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        ingredient_id,
        ingredients:ingredient_id (*)
      `)
            .eq('benefit_id', benefitId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => ingredient_model_1.Ingredient.fromJSON(item.ingredients));
    }
};
exports.IngredientBenefitRepository = IngredientBenefitRepository;
exports.IngredientBenefitRepository = IngredientBenefitRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], IngredientBenefitRepository);
//# sourceMappingURL=ingredient-benefit.repository.js.map