"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const base_model_1 = require("./base.model");
const role_model_1 = require("./role.model");
class User extends base_model_1.BaseModel {
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
            email: this.email,
            hashed_password: this.hashed_password,
            role_id: this.role_id,
            created_at: this.created_at,
            ...(this.role && { role: this.role.toJSON() })
        };
    }
    static fromJSON(json) {
        return new User({
            id: json.id,
            email: json.email,
            hashed_password: json.hashed_password,
            role_id: json.role_id,
            created_at: json.created_at,
            ...(json.role && { role: role_model_1.Role.fromJSON(json.role) })
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map