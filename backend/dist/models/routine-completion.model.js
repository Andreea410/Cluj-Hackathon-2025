"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineCompletion = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class RoutineCompletion extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.date) {
            this.date = new Date(partial.date);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            date: this.date,
            morning_completed: this.morning_completed,
            night_completed: this.night_completed,
            points_awarded: this.points_awarded,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new RoutineCompletion({
            id: json.id,
            user_id: json.user_id,
            date: json.date,
            morning_completed: json.morning_completed,
            night_completed: json.night_completed,
            points_awarded: json.points_awarded,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.RoutineCompletion = RoutineCompletion;
//# sourceMappingURL=routine-completion.model.js.map