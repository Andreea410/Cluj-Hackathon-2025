"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinProfile = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class SkinProfile extends base_model_1.BaseModel {
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
            skin_type: this.skin_type,
            concerns: this.concerns,
            breakouts_frequency: this.breakouts_frequency,
            allergies: this.allergies,
            current_products: this.current_products,
            created_at: this.created_at,
            updated_at: this.updated_at,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new SkinProfile({
            id: json.id,
            user_id: json.user_id,
            skin_type: json.skin_type,
            concerns: json.concerns,
            breakouts_frequency: json.breakouts_frequency,
            allergies: json.allergies,
            current_products: json.current_products,
            created_at: json.created_at,
            updated_at: json.updated_at,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.SkinProfile = SkinProfile;
//# sourceMappingURL=skin-profile.model.js.map