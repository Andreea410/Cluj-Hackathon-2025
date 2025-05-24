"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const base_model_1 = require("./base.model");
const role_model_1 = require("./role.model");
class User extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        const { password, ...userData } = partial;
        Object.assign(this, userData);
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
            first_name: this.first_name,
            last_name: this.last_name,
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
            first_name: json.first_name,
            last_name: json.last_name,
            ...(json.role && { role: role_model_1.Role.fromJSON(json.role) })
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map