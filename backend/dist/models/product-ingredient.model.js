"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductIngredient = void 0;
const base_model_1 = require("./base.model");
class ProductIngredient extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            product_id: this.product_id,
            ingredient_id: this.ingredient_id
        };
    }
    static fromJSON(json) {
        return new ProductIngredient({
            id: json.id,
            product_id: json.product_id,
            ingredient_id: json.ingredient_id
        });
    }
}
exports.ProductIngredient = ProductIngredient;
//# sourceMappingURL=product-ingredient.model.js.map