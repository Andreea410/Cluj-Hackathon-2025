"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const base_model_1 = require("./base.model");
class Product extends base_model_1.BaseModel {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
    toJSON() {
        const base = super.toJSON();
        return {
            ...base,
            name: this.name,
            brand_id: this.brand_id,
            price: this.price,
            photo_url: this.photo_url,
            description: this.description,
            stock: this.stock
        };
    }
    static fromJSON(json) {
        return new Product({
            id: json.id,
            name: json.name,
            brand_id: json.brand_id,
            price: json.price,
            photo_url: json.photo_url,
            description: json.description,
            stock: json.stock
        });
    }
}
exports.Product = Product;
//# sourceMappingURL=product.model.js.map