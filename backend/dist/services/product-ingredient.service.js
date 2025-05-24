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
exports.ProductIngredientService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const product_ingredient_model_1 = require("../models/product-ingredient.model");
let ProductIngredientService = class ProductIngredientService extends base_service_1.BaseService {
    constructor(productIngredientRepository) {
        super(productIngredientRepository);
        this.productIngredientRepository = productIngredientRepository;
    }
    async addIngredientToProduct(productId, ingredientId) {
        const existing = await this.productIngredientRepository.findByProductAndIngredient(productId, ingredientId);
        if (existing) {
            throw new Error('This ingredient is already added to the product');
        }
        const productIngredient = new product_ingredient_model_1.ProductIngredient({
            product_id: productId,
            ingredient_id: ingredientId
        });
        return this.create(productIngredient);
    }
    async removeIngredientFromProduct(productId, ingredientId) {
        const existing = await this.productIngredientRepository.findByProductAndIngredient(productId, ingredientId);
        if (!existing) {
            throw new Error('This ingredient is not associated with the product');
        }
        await this.delete(existing.id);
    }
    async getProductIngredients(productId) {
        return this.productIngredientRepository.findProductsWithIngredients(productId);
    }
    async getIngredientProducts(ingredientId) {
        return this.productIngredientRepository.findIngredientProducts(ingredientId);
    }
    async getProductIngredientsList(productId) {
        return this.productIngredientRepository.findByProductId(productId);
    }
    async getIngredientProductsList(ingredientId) {
        return this.productIngredientRepository.findByIngredientId(ingredientId);
    }
};
exports.ProductIngredientService = ProductIngredientService;
exports.ProductIngredientService = ProductIngredientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ProductIngredientService);
//# sourceMappingURL=product-ingredient.service.js.map