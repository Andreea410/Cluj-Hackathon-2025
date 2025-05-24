"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientBenefit = void 0;
const base_model_1 = require("./base.model");
class IngredientBenefit extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            ingredient_id: this.ingredient_id,
            benefit_id: this.benefit_id
        };
    }
    static fromJSON(json) {
        return new IngredientBenefit({
            id: json.id,
            ingredient_id: json.ingredient_id,
            benefit_id: json.benefit_id
        });
    }
}
exports.IngredientBenefit = IngredientBenefit;
//# sourceMappingURL=ingredient-benefit.model.js.map