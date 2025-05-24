"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
const plan_model_1 = require("./plan.model");
class Subscription extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.start_date) {
            this.start_date = new Date(partial.start_date);
        }
        if (partial.end_date) {
            this.end_date = new Date(partial.end_date);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            plan_id: this.plan_id,
            start_date: this.start_date,
            end_date: this.end_date,
            status: this.status,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() }),
            ...(this.plan && { plan: this.plan.toJSON() })
        };
    }
    static fromJSON(json) {
        return new Subscription({
            id: json.id,
            user_id: json.user_id,
            plan_id: json.plan_id,
            start_date: json.start_date,
            end_date: json.end_date,
            status: json.status,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) }),
            ...(json.plan && { plan: plan_model_1.Plan.fromJSON(json.plan) })
        });
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.model.js.map