"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransaction = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class PointTransaction extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            points: this.points,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new PointTransaction({
            id: json.id,
            user_id: json.user_id,
            points: json.points,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.PointTransaction = PointTransaction;
//# sourceMappingURL=point-transaction.model.js.map