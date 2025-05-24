"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const base_model_1 = require("./base.model");
class Ingredient extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            name: this.name
        };
    }
    static fromJSON(json) {
        return new Ingredient({
            id: json.id,
            name: json.name
        });
    }
}
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.model.js.map