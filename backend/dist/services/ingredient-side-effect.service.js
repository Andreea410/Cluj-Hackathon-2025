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
exports.IngredientSideEffectService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const ingredient_side_effect_model_1 = require("../models/ingredient-side-effect.model");
let IngredientSideEffectService = class IngredientSideEffectService extends base_service_1.BaseService {
    constructor(ingredientSideEffectRepository) {
        super(ingredientSideEffectRepository);
        this.ingredientSideEffectRepository = ingredientSideEffectRepository;
    }
    async createIngredientSideEffect(ingredientSideEffect) {
        const existing = await this.ingredientSideEffectRepository.findByIngredientAndSideEffect(ingredientSideEffect.ingredient_id, ingredientSideEffect.side_effect_id);
        if (existing) {
            throw new Error('This ingredient-side effect association already exists');
        }
        return this.create(ingredientSideEffect);
    }
    async findByIngredientId(ingredientId) {
        return this.ingredientSideEffectRepository.findByIngredientId(ingredientId);
    }
    async findBySideEffectId(sideEffectId) {
        return this.ingredientSideEffectRepository.findBySideEffectId(sideEffectId);
    }
    async findByIngredientAndSideEffect(ingredientId, sideEffectId) {
        return this.ingredientSideEffectRepository.findByIngredientAndSideEffect(ingredientId, sideEffectId);
    }
    async findWithRelations(id) {
        return this.ingredientSideEffectRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.ingredientSideEffectRepository.findAllWithRelations();
    }
    async findAllByIngredientWithSideEffects(ingredientId) {
        return this.ingredientSideEffectRepository.findAllByIngredientWithSideEffects(ingredientId);
    }
    async findAllBySideEffectWithIngredients(sideEffectId) {
        return this.ingredientSideEffectRepository.findAllBySideEffectWithIngredients(sideEffectId);
    }
    async updateIngredientSideEffect(id, ingredientSideEffect) {
        if (ingredientSideEffect.ingredient_id || ingredientSideEffect.side_effect_id) {
            const current = await this.findById(id);
            const newIngredientId = ingredientSideEffect.ingredient_id || current.ingredient_id;
            const newSideEffectId = ingredientSideEffect.side_effect_id || current.side_effect_id;
            const existing = await this.findByIngredientAndSideEffect(newIngredientId, newSideEffectId);
            if (existing && existing.id !== id) {
                throw new Error('This ingredient-side effect association already exists');
            }
        }
        return this.update(id, ingredientSideEffect);
    }
    async bulkCreateIngredientSideEffects(ingredientId, sideEffectIds) {
        const results = [];
        for (const sideEffectId of sideEffectIds) {
            try {
                const association = await this.createIngredientSideEffect(new ingredient_side_effect_model_1.IngredientSideEffect({
                    ingredient_id: ingredientId,
                    side_effect_id: sideEffectId
                }));
                results.push(association);
            }
            catch (error) {
                if (!error.message.includes('already exists')) {
                    throw error;
                }
            }
        }
        return results;
    }
};
exports.IngredientSideEffectService = IngredientSideEffectService;
exports.IngredientSideEffectService = IngredientSideEffectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], IngredientSideEffectService);
//# sourceMappingURL=ingredient-side-effect.service.js.map