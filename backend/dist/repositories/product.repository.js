"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const product_model_1 = require("../models/product.model");
const brand_model_1 = require("../models/brand.model");
const database_error_1 = require("../shared/exceptions/database.error");
let ProductRepository = class ProductRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'products', product_model_1.Product);
    }
    async findByName(name) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .ilike('name', name)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? product_model_1.Product.fromJSON(data) : null;
    }
    async findByBrandId(brandId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('brand_id', brandId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_model_1.Product.fromJSON(item));
    }
    async findByPriceRange(minPrice, maxPrice) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('price', minPrice)
            .lte('price', maxPrice);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_model_1.Product.fromJSON(item));
    }
    async findInStock() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gt('stock', 0);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_model_1.Product.fromJSON(item));
    }
    async findOutOfStock() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('stock', 0);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_model_1.Product.fromJSON(item));
    }
    async findWithBrand(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        brands:brand_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        if (!data)
            return null;
        return {
            product: product_model_1.Product.fromJSON(data),
            brand: brand_model_1.Brand.fromJSON(data.brands)
        };
    }
    async searchProducts(query) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .or(`name.ilike.%${query}%, description.ilike.%${query}%`);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_model_1.Product.fromJSON(item));
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map