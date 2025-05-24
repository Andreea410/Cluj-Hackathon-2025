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
exports.ProductIngredientController = void 0;
const common_1 = require("@nestjs/common");
const product_ingredient_service_1 = require("../services/product-ingredient.service");
let ProductIngredientController = class ProductIngredientController {
    constructor(productIngredientService) {
        this.productIngredientService = productIngredientService;
    }
    async addIngredientToProduct(productId, ingredientId) {
        try {
            return await this.productIngredientService.addIngredientToProduct(productId, ingredientId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeIngredientFromProduct(productId, ingredientId) {
        try {
            await this.productIngredientService.removeIngredientFromProduct(productId, ingredientId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProductIngredients(productId) {
        try {
            return await this.productIngredientService.getProductIngredients(productId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getIngredientProducts(ingredientId) {
        try {
            return await this.productIngredientService.getIngredientProducts(ingredientId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getProductIngredientsList(productId) {
        try {
            return await this.productIngredientService.getProductIngredientsList(productId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getIngredientProductsList(ingredientId) {
        try {
            return await this.productIngredientService.getIngredientProductsList(ingredientId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductIngredientController = ProductIngredientController;
__decorate([
    (0, common_1.Post)('product/:productId/ingredient/:ingredientId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductIngredientController.prototype, "addIngredientToProduct", null);
__decorate([
    (0, common_1.Delete)('product/:productId/ingredient/:ingredientId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductIngredientController.prototype, "removeIngredientFromProduct", null);
__decorate([
    (0, common_1.Get)('product/:productId/ingredients'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductIngredientController.prototype, "getProductIngredients", null);
__decorate([
    (0, common_1.Get)('ingredient/:ingredientId/products'),
    __param(0, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductIngredientController.prototype, "getIngredientProducts", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductIngredientController.prototype, "getProductIngredientsList", null);
__decorate([
    (0, common_1.Get)('ingredient/:ingredientId'),
    __param(0, (0, common_1.Param)('ingredientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductIngredientController.prototype, "getIngredientProductsList", null);
exports.ProductIngredientController = ProductIngredientController = __decorate([
    (0, common_1.Controller)('product-ingredients'),
    __metadata("design:paramtypes", [product_ingredient_service_1.ProductIngredientService])
], ProductIngredientController);
//# sourceMappingURL=product-ingredient.controller.js.map