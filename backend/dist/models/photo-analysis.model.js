"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoAnalysis = void 0;
const base_model_1 = require("./base.model");
const photo_upload_model_1 = require("./photo-upload.model");
class PhotoAnalysis extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
        if (partial.analyzed_at) {
            this.analyzed_at = new Date(partial.analyzed_at);
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            photo_upload_id: this.photo_upload_id,
            analyzed_at: this.analyzed_at,
            metrics: this.metrics,
            ...(this.photoUpload && { photoUpload: this.photoUpload.toJSON() })
        };
    }
    static fromJSON(json) {
        return new PhotoAnalysis({
            id: json.id,
            photo_upload_id: json.photo_upload_id,
            analyzed_at: json.analyzed_at,
            metrics: json.metrics,
            ...(json.photo_upload && { photoUpload: photo_upload_model_1.PhotoUpload.fromJSON(json.photo_upload) })
        });
    }
}
exports.PhotoAnalysis = PhotoAnalysis;
//# sourceMappingURL=photo-analysis.model.js.map