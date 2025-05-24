"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const base_model_1 = require("./base.model");
class Option extends base_model_1.BaseModel {
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
            text: this.text,
            question_id: this.question_id,
            created_at: this.created_at
        };
    }
    static fromJSON(json) {
        return new Option({
            id: json.id,
            text: json.text,
            question_id: json.question_id,
            created_at: json.created_at
        });
    }
}
exports.Option = Option;
//# sourceMappingURL=option.model.js.map