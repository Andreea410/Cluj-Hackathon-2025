"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineStep = void 0;
const base_model_1 = require("./base.model");
const routine_template_model_1 = require("./routine-template.model");
class RoutineStep extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            routine_template_id: this.routine_template_id,
            step_number: this.step_number,
            name: this.name,
            description: this.description,
            ...(this.routineTemplate && { routineTemplate: this.routineTemplate.toJSON() })
        };
    }
    static fromJSON(json) {
        return new RoutineStep({
            id: json.id,
            routine_template_id: json.routine_template_id,
            step_number: json.step_number,
            name: json.name,
            description: json.description,
            ...(json.routine_template && { routineTemplate: routine_template_model_1.RoutineTemplate.fromJSON(json.routine_template) })
        });
    }
}
exports.RoutineStep = RoutineStep;
//# sourceMappingURL=routine-step.model.js.map