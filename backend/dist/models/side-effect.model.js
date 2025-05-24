"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideEffect = void 0;
const base_model_1 = require("./base.model");
class SideEffect extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            description: this.description
        };
    }
    static fromJSON(json) {
        return new SideEffect({
            id: json.id,
            name: json.name,
            description: json.description
        });
    }
}
exports.SideEffect = SideEffect;
//# sourceMappingURL=side-effect.model.js.map