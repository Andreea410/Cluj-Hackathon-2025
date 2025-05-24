"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineTemplate = void 0;
const base_model_1 = require("./base.model");
class RoutineTemplate extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            name: this.name,
            description: this.description
        };
    }
    static fromJSON(json) {
        return new RoutineTemplate({
            id: json.id,
            name: json.name,
            description: json.description
        });
    }
}
exports.RoutineTemplate = RoutineTemplate;
//# sourceMappingURL=routine-template.model.js.map