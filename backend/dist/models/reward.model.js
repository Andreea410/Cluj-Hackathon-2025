"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reward = void 0;
const base_model_1 = require("./base.model");
class Reward extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            description: this.description,
            threshold_points: this.threshold_points
        };
    }
    static fromJSON(json) {
        return new Reward({
            id: json.id,
            name: json.name,
            description: json.description,
            threshold_points: json.threshold_points
        });
    }
}
exports.Reward = Reward;
//# sourceMappingURL=reward.model.js.map