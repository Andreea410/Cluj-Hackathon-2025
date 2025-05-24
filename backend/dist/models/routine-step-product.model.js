"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineStepProduct = void 0;
const base_model_1 = require("./base.model");
const routine_step_model_1 = require("./routine-step.model");
const product_model_1 = require("./product.model");
class RoutineStepProduct extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            routine_step_id: this.routine_step_id,
            product_id: this.product_id,
            ...(this.routineStep && { routineStep: this.routineStep.toJSON() }),
            ...(this.product && { product: this.product.toJSON() })
        };
    }
    static fromJSON(json) {
        return new RoutineStepProduct({
            id: json.id,
            routine_step_id: json.routine_step_id,
            product_id: json.product_id,
            ...(json.routine_step && { routineStep: routine_step_model_1.RoutineStep.fromJSON(json.routine_step) }),
            ...(json.product && { product: product_model_1.Product.fromJSON(json.product) })
        });
    }
}
exports.RoutineStepProduct = RoutineStepProduct;
//# sourceMappingURL=routine-step-product.model.js.map