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
exports.ProductIngredientRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const product_ingredient_model_1 = require("../models/product-ingredient.model");
const product_model_1 = require("../models/product.model");
const ingredient_model_1 = require("../models/ingredient.model");
const database_error_1 = require("../shared/exceptions/database.error");
let ProductIngredientRepository = class ProductIngredientRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'product_ingredients', product_ingredient_model_1.ProductIngredient);
    }
    async findByProductId(productId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('product_id', productId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_ingredient_model_1.ProductIngredient.fromJSON(item));
    }
    async findByIngredientId(ingredientId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('ingredient_id', ingredientId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => product_ingredient_model_1.ProductIngredient.fromJSON(item));
    }
    async findProductsWithIngredients(productId) {
        const { data, error } = await this.supabase
            .from('products')
            .select(`
        *,
        product_ingredients!inner (
          ingredients (*)
        )
      `)
            .eq('id', productId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        if (!data)
            throw new database_error_1.DatabaseError('Product not found');
        return {
            product: product_model_1.Product.fromJSON(data),
            ingredients: data.product_ingredients.map(pi => ingredient_model_1.Ingredient.fromJSON(pi.ingredients))
        };
    }
    async findIngredientProducts(ingredientId) {
        const { data, error } = await this.supabase
            .from('ingredients')
            .select(`
        *,
        product_ingredients!inner (
          products (*)
        )
      `)
            .eq('id', ingredientId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        if (!data)
            throw new database_error_1.DatabaseError('Ingredient not found');
        return {
            ingredient: ingredient_model_1.Ingredient.fromJSON(data),
            products: data.product_ingredients.map(pi => product_model_1.Product.fromJSON(pi.products))
        };
    }
    async findByProductAndIngredient(productId, ingredientId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('product_id', productId)
            .eq('ingredient_id', ingredientId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? product_ingredient_model_1.ProductIngredient.fromJSON(data) : null;
    }
};
exports.ProductIngredientRepository = ProductIngredientRepository;
exports.ProductIngredientRepository = ProductIngredientRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], ProductIngredientRepository);
//# sourceMappingURL=product-ingredient.repository.js.map