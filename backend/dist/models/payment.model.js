"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const base_model_1 = require("./base.model");
const order_model_1 = require("./order.model");
class Payment extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.paid_at) {
            this.paid_at = new Date(partial.paid_at);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            order_id: this.order_id,
            stripe_charge_id: this.stripe_charge_id,
            paid_at: this.paid_at,
            ...(this.order && { order: this.order.toJSON() })
        };
    }
    static fromJSON(json) {
        return new Payment({
            id: json.id,
            order_id: json.order_id,
            stripe_charge_id: json.stripe_charge_id,
            paid_at: json.paid_at,
            ...(json.order && { order: order_model_1.Order.fromJSON(json.order) })
        });
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.model.js.map