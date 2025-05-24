"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutineLog = void 0;
const base_model_1 = require("./base.model");
const user_routine_model_1 = require("./user-routine.model");
class UserRoutineLog extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_routine_id: this.user_routine_id,
            log_date: this.log_date,
            completed_steps: this.completed_steps,
            auth_user_id: this.auth_user_id,
            ...(this.userRoutine && { userRoutine: this.userRoutine.toJSON() })
        };
    }
    static fromJSON(json) {
        return new UserRoutineLog({
            id: json.id,
            user_routine_id: json.user_routine_id,
            log_date: json.log_date ? new Date(json.log_date) : undefined,
            completed_steps: json.completed_steps,
            auth_user_id: json.auth_user_id,
            ...(json.user_routine && { userRoutine: user_routine_model_1.UserRoutine.fromJSON(json.user_routine) })
        });
    }
}
exports.UserRoutineLog = UserRoutineLog;
//# sourceMappingURL=user-routine-log.model.js.map