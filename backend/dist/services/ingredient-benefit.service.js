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
exports.IngredientBenefitService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const ingredient_benefit_model_1 = require("../models/ingredient-benefit.model");
let IngredientBenefitService = class IngredientBenefitService extends base_service_1.BaseService {
    constructor(ingredientBenefitRepository) {
        super(ingredientBenefitRepository);
        this.ingredientBenefitRepository = ingredientBenefitRepository;
    }
    async linkIngredientToBenefit(ingredientId, benefitId) {
        const existing = await this.ingredientBenefitRepository.findByIngredientAndBenefit(ingredientId, benefitId);
        if (existing) {
            throw new Error('This ingredient is already linked to this benefit');
        }
        const link = new ingredient_benefit_model_1.IngredientBenefit({
            ingredient_id: ingredientId,
            benefit_id: benefitId
        });
        return this.create(link);
    }
    async unlinkIngredientFromBenefit(ingredientId, benefitId) {
        const existing = await this.ingredientBenefitRepository.findByIngredientAndBenefit(ingredientId, benefitId);
        if (!existing) {
            throw new Error('This ingredient is not linked to this benefit');
        }
        await this.delete(existing.id);
    }
    async getBenefitsForIngredient(ingredientId) {
        return this.ingredientBenefitRepository.getBenefitsForIngredient(ingredientId);
    }
    async getIngredientsForBenefit(benefitId) {
        return this.ingredientBenefitRepository.getIngredientsForBenefit(benefitId);
    }
};
exports.IngredientBenefitService = IngredientBenefitService;
exports.IngredientBenefitService = IngredientBenefitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], IngredientBenefitService);
//# sourceMappingURL=ingredient-benefit.service.js.map