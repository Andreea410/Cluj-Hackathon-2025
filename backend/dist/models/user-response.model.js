"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
const question_model_1 = require("./question.model");
const option_model_1 = require("./option.model");
class UserResponse extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            question_id: this.question_id,
            option_id: this.option_id,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() }),
            ...(this.question && { question: this.question.toJSON() }),
            ...(this.option && { option: this.option.toJSON() })
        };
    }
    static fromJSON(json) {
        return new UserResponse({
            id: json.id,
            user_id: json.user_id,
            question_id: json.question_id,
            option_id: json.option_id,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) }),
            ...(json.question && { question: question_model_1.Question.fromJSON(json.question) }),
            ...(json.option && { option: option_model_1.Option.fromJSON(json.option) })
        });
    }
}
exports.UserResponse = UserResponse;
//# sourceMappingURL=user-response.model.js.map