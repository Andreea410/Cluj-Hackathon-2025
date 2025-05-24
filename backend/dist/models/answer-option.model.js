"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerOption = void 0;
const base_model_1 = require("./base.model");
class AnswerOption extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            question_id: this.question_id,
            value: this.value
        };
    }
    static fromJSON(json) {
        return new AnswerOption({
            id: json.id,
            question_id: json.question_id,
            value: json.value
        });
    }
}
exports.AnswerOption = AnswerOption;
//# sourceMappingURL=answer-option.model.js.map