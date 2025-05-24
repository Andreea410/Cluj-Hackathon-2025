"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinAnalysis = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class SkinAnalysis extends base_model_1.BaseModel {
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
            messages: this.messages,
            skin_info: this.skin_info,
            created_at: this.created_at,
            updated_at: this.updated_at,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new SkinAnalysis({
            id: json.id,
            user_id: json.user_id,
            messages: json.messages,
            skin_info: json.skin_info,
            created_at: json.created_at,
            updated_at: json.updated_at,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.SkinAnalysis = SkinAnalysis;
//# sourceMappingURL=skin-analysis.model.js.map