"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const base_model_1 = require("./base.model");
class Question extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            text: this.text,
            field_key: this.field_key
        };
    }
    static fromJSON(json) {
        return new Question({
            id: json.id,
            text: json.text,
            field_key: json.field_key
        });
    }
}
exports.Question = Question;
//# sourceMappingURL=question.model.js.map