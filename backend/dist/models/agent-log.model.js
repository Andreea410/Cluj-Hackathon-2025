"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentLog = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class AgentLog extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            role: this.role,
            message: this.message,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new AgentLog({
            id: json.id,
            user_id: json.user_id,
            role: json.role,
            message: json.message,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.AgentLog = AgentLog;
//# sourceMappingURL=agent-log.model.js.map