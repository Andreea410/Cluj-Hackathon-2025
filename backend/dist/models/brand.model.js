"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const base_model_1 = require("./base.model");
class Brand extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            name: this.name,
            website: this.website,
            logo_url: this.logo_url
        };
    }
    static fromJSON(json) {
        return new Brand({
            id: json.id,
            name: json.name,
            website: json.website,
            logo_url: json.logo_url
        });
    }
}
exports.Brand = Brand;
//# sourceMappingURL=brand.model.js.map