"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientSideEffect = void 0;
const base_model_1 = require("./base.model");
const ingredient_model_1 = require("./ingredient.model");
const side_effect_model_1 = require("./side-effect.model");
class IngredientSideEffect extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            ingredient_id: this.ingredient_id,
            side_effect_id: this.side_effect_id,
            ...(this.ingredient && { ingredient: this.ingredient.toJSON() }),
            ...(this.sideEffect && { sideEffect: this.sideEffect.toJSON() })
        };
    }
    static fromJSON(json) {
        return new IngredientSideEffect({
            id: json.id,
            ingredient_id: json.ingredient_id,
            side_effect_id: json.side_effect_id,
            ...(json.ingredient && { ingredient: ingredient_model_1.Ingredient.fromJSON(json.ingredient) }),
            ...(json.side_effect && { sideEffect: side_effect_model_1.SideEffect.fromJSON(json.side_effect) })
        });
    }
}
exports.IngredientSideEffect = IngredientSideEffect;
//# sourceMappingURL=ingredient-side-effect.model.js.map