"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryEntry = void 0;
const base_model_1 = require("./base.model");
class DiaryEntry extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            user_id: this.user_id,
            date: this.date,
            image_url: this.image_url,
            notes: this.notes,
            created_at: this.created_at
        };
    }
    static fromJSON(json) {
        return new DiaryEntry({
            id: json.id,
            user_id: json.user_id,
            date: new Date(json.date),
            image_url: json.image_url,
            notes: json.notes,
            created_at: new Date(json.created_at)
        });
    }
}
exports.DiaryEntry = DiaryEntry;
//# sourceMappingURL=diary-entry.model.js.map