"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const base_model_1 = require("./base.model");
class Order extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.created_at) {
            this.created_at = new Date(partial.created_at);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            total_amount: this.total_amount,
            status: this.status,
            created_at: this.created_at
        };
    }
    static fromJSON(json) {
        return new Order({
            id: json.id,
            user_id: json.user_id,
            total_amount: json.total_amount,
            status: json.status,
            created_at: json.created_at
        });
    }
}
exports.Order = Order;
//# sourceMappingURL=order.model.js.map