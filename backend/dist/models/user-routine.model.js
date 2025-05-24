"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutine = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
const routine_template_model_1 = require("./routine-template.model");
class UserRoutine extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            routine_template_id: this.routine_template_id,
            assigned_at: this.assigned_at,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() }),
            ...(this.routineTemplate && { routineTemplate: this.routineTemplate.toJSON() })
        };
    }
    static fromJSON(json) {
        return new UserRoutine({
            id: json.id,
            user_id: json.user_id,
            routine_template_id: json.routine_template_id,
            assigned_at: json.assigned_at ? new Date(json.assigned_at) : undefined,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) }),
            ...(json.routine_template && { routineTemplate: routine_template_model_1.RoutineTemplate.fromJSON(json.routine_template) })
        });
    }
}
exports.UserRoutine = UserRoutine;
//# sourceMappingURL=user-routine.model.js.map