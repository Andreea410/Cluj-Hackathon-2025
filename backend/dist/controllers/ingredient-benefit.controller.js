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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientBenefitController = void 0;
const common_1 = require("@nestjs/common");
const ingredient_benefit_service_1 = require("../services/ingredient-benefit.service");
let IngredientBenefitController = class IngredientBenefitController {
    constructor(ingredientBenefitService) {
        this.ingredientBenefitService = ingredientBenefitService;
    }
    async linkIngredientToBenefit(ingredientId, benefitId) {
        try {
            return await this.ingredientBenefitService.linkIngredientToBenefit(ingredientId, benefitId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async unlinkIngredientFromBenefit(ingredientId, benefitId) {
        try {
            await this.ingredientBenefitService.unlinkIngredientFromBenefit(ingredientId, benefitId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getBenefitsForIngredient(ingredientId) {
        try {
            return await this.ingredientBenefitService.getBenefitsForIngredient(ingredientId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getIngredientsForBenefit(benefitId) {
        try {
            return await this.ingredientBenefitService.getIngredientsForBenefit(benefitId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.IngredientBenefitController = IngredientBenefitController;
__decorate([
    (0, common_1.Post)(':ingredientId/benefits/:benefitId'),
    __param(0, (0, common_1.Param)('ingredientId')),
    __param(1, (0, common_1.Param)('benefitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IngredientBenefitController.prototype, "linkIngredientToBenefit", null);
__decorate([
    (0, common_1.Delete)(':ingredientId/benefits/:benefitId'),
    __param(0, (0, common_1.Param)('ingredientId')),
    __param(1, (0, common_1.Param)('benefitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], IngredientBenefitController.prototype, "unlinkIngredientFromBenefit", null);
__decorate([
    (0, common_1.Get)('ingredients/:ingredientId/benefits'),
    __param(0, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngredientBenefitController.prototype, "getBenefitsForIngredient", null);
__decorate([
    (0, common_1.Get)('benefits/:benefitId/ingredients'),
    __param(0, (0, common_1.Param)('benefitId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngredientBenefitController.prototype, "getIngredientsForBenefit", null);
exports.IngredientBenefitController = IngredientBenefitController = __decorate([
    (0, common_1.Controller)('ingredient-benefits'),
    __metadata("design:paramtypes", [ingredient_benefit_service_1.IngredientBenefitService])
], IngredientBenefitController);
//# sourceMappingURL=ingredient-benefit.controller.js.map