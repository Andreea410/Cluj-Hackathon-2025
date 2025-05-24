import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IProductIngredientRepository } from './interfaces/product-ingredient.repository.interface';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';
import { Ingredient } from '../models/ingredient.model';
export declare class ProductIngredientRepository extends BaseSupabaseRepository<ProductIngredient> implements IProductIngredientRepository {
    constructor(supabase: SupabaseClient);
    findByProductId(productId: string): Promise<ProductIngredient[]>;
    findByIngredientId(ingredientId: string): Promise<ProductIngredient[]>;
    findProductsWithIngredients(productId: string): Promise<{
        product: Product;
        ingredients: Ingredient[];
    }>;
    findIngredientProducts(ingredientId: string): Promise<{
        ingredient: Ingredient;
        products: Product[];
    }>;
    findByProductAndIngredient(productId: string, ingredientId: string): Promise<ProductIngredient | null>;
}
