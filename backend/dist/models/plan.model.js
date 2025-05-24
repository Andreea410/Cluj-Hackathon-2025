"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const base_model_1 = require("./base.model");
class Plan extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            price_per_month: this.price_per_month,
            features: this.features
        };
    }
    static fromJSON(json) {
        return new Plan({
            id: json.id,
            name: json.name,
            price_per_month: json.price_per_month,
            features: json.features
        });
    }
}
exports.Plan = Plan;
//# sourceMappingURL=plan.model.js.map