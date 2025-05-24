"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoUpload = void 0;
const base_model_1 = require("./base.model");
const user_model_1 = require("./user.model");
class PhotoUpload extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.upload_date) {
            this.upload_date = new Date(partial.upload_date);
        }
        if (partial.created_at) {
            this.created_at = new Date(partial.created_at);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            user_id: this.user_id,
            upload_date: this.upload_date,
            file_url: this.file_url,
            created_at: this.created_at,
            auth_user_id: this.auth_user_id,
            ...(this.user && { user: this.user.toJSON() })
        };
    }
    static fromJSON(json) {
        return new PhotoUpload({
            id: json.id,
            user_id: json.user_id,
            upload_date: json.upload_date,
            file_url: json.file_url,
            created_at: json.created_at,
            auth_user_id: json.auth_user_id,
            ...(json.user && { user: user_model_1.User.fromJSON(json.user) })
        });
    }
}
exports.PhotoUpload = PhotoUpload;
//# sourceMappingURL=photo-upload.model.js.map