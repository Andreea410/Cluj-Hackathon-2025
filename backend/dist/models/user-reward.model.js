"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReward = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
const reward_model_1 = require("./reward.model");
class UserReward extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            reward_id: this.reward_id,
            claimed_at: this.claimed_at,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() }),
            ...(this.reward && { reward: this.reward.toJSON() })
        };
    }
    static fromJSON(json) {
        return new UserReward({
            id: json.id,
            user_id: json.user_id,
            reward_id: json.reward_id,
            claimed_at: json.claimed_at ? new Date(json.claimed_at) : undefined,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) }),
            ...(json.reward && { reward: reward_model_1.Reward.fromJSON(json.reward) })
        });
    }
}
exports.UserReward = UserReward;
//# sourceMappingURL=user-reward.model.js.map