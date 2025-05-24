"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineAdjustment = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
const photo_analysis_model_1 = require("./photo-analysis.model");
class RoutineAdjustment extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            photo_analysis_id: this.photo_analysis_id,
            actions: this.actions,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() }),
            ...(this.photoAnalysis && { photoAnalysis: this.photoAnalysis.toJSON() })
        };
    }
    static fromJSON(json) {
        return new RoutineAdjustment({
            id: json.id,
            user_id: json.user_id,
            photo_analysis_id: json.photo_analysis_id,
            actions: json.actions,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) }),
            ...(json.photo_analysis && { photoAnalysis: photo_analysis_model_1.PhotoAnalysis.fromJSON(json.photo_analysis) })
        });
    }
}
exports.RoutineAdjustment = RoutineAdjustment;
//# sourceMappingURL=routine-adjustment.model.js.map