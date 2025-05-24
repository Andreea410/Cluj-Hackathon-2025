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
exports.IngredientService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let IngredientService = class IngredientService extends base_service_1.BaseService {
    constructor(ingredientRepository) {
        super(ingredientRepository);
        this.ingredientRepository = ingredientRepository;
    }
    async createIngredient(ingredient) {
        const existingIngredient = await this.ingredientRepository.findByName(ingredient.name);
        if (existingIngredient) {
            throw new Error('An ingredient with this name already exists');
        }
        return this.create(ingredient);
    }
    async updateIngredient(id, ingredient) {
        if (ingredient.name) {
            const existingIngredient = await this.ingredientRepository.findByName(ingredient.name);
            if (existingIngredient && existingIngredient.id !== id) {
                throw new Error('An ingredient with this name already exists');
            }
        }
        return this.update(id, ingredient);
    }
};
exports.IngredientService = IngredientService;
exports.IngredientService = IngredientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], IngredientService);
//# sourceMappingURL=ingredient.service.js.map