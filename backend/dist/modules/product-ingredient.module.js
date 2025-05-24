"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductIngredientModule = void 0;
const common_1 = require("@nestjs/common");
const product_ingredient_controller_1 = require("../controllers/product-ingredient.controller");
const product_ingredient_service_1 = require("../services/product-ingredient.service");
const product_ingredient_repository_1 = require("../repositories/product-ingredient.repository");
let ProductIngredientModule = class ProductIngredientModule {
};
exports.ProductIngredientModule = ProductIngredientModule;
exports.ProductIngredientModule = ProductIngredientModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_ingredient_controller_1.ProductIngredientController],
        providers: [product_ingredient_service_1.ProductIngredientService, product_ingredient_repository_1.ProductIngredientRepository],
        exports: [product_ingredient_service_1.ProductIngredientService]
    })
], ProductIngredientModule);
//# sourceMappingURL=product-ingredient.module.js.map