"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkincareRoutine = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class SkincareRoutine extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.created_at) {
            this.created_at = new Date(partial.created_at);
        }
        if (partial.updated_at) {
            this.updated_at = new Date(partial.updated_at);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            name: this.name,
            steps: this.steps,
            created_at: this.created_at,
            updated_at: this.updated_at,
            is_active: this.is_active,
            points_earned: this.points_earned,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new SkincareRoutine({
            id: json.id,
            user_id: json.user_id,
            name: json.name,
            steps: json.steps,
            created_at: json.created_at,
            updated_at: json.updated_at,
            is_active: json.is_active,
            points_earned: json.points_earned,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.SkincareRoutine = SkincareRoutine;
//# sourceMappingURL=skincare-routine.model.js.map