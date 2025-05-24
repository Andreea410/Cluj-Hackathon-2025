"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinQuestionnaire = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class SkinQuestionnaire extends base_model_1.BaseModel {
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
            responses: this.responses,
            created_at: this.created_at,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new SkinQuestionnaire({
            id: json.id,
            user_id: json.user_id,
            responses: json.responses,
            created_at: json.created_at,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.SkinQuestionnaire = SkinQuestionnaire;
//# sourceMappingURL=skin-questionnaire.model.js.map