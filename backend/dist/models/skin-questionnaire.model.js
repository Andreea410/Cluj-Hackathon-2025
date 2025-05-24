"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinQuestionnaire = void 0;
const base_model_1 = require("./base.model");
class SkinQuestionnaire extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            responses: this.responses,
            created_at: this.created_at
        };
    }
    static fromJSON(json) {
        return new SkinQuestionnaire({
            id: json.id,
            user_id: json.user_id,
            responses: json.responses,
            created_at: new Date(json.created_at)
        });
    }
}
exports.SkinQuestionnaire = SkinQuestionnaire;
//# sourceMappingURL=skin-questionnaire.model.js.map