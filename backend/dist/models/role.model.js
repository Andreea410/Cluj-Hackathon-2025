"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const base_model_1 = require("./base.model");
class Role extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            permissions: this.permissions
        };
    }
    static fromJSON(json) {
        return new Role({
            id: json.id,
            name: json.name,
            permissions: json.permissions
        });
    }
}
exports.Role = Role;
//# sourceMappingURL=role.model.js.map