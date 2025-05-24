import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IProductIngredientRepository } from './interfaces/product-ingredient.repository.interface';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';
import { Ingredient } from '../models/ingredient.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class ProductIngredientRepository extends BaseSupabaseRepository<ProductIngredient> implements IProductIngredientRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'product_ingredients', ProductIngredient);
  }

  async findByProductId(productId: string): Promise<ProductIngredient[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('product_id', productId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => ProductIngredient.fromJSON(item));
  }

  async findByIngredientId(ingredientId: string): Promise<ProductIngredient[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('ingredient_id', ingredientId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => ProductIngredient.fromJSON(item));
  }

  async findProductsWithIngredients(productId: string): Promise<{ product: Product; ingredients: Ingredient[] }> {
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

    if (error) throw new DatabaseError(error.message);
    if (!data) throw new DatabaseError('Product not found');

    return {
      product: Product.fromJSON(data),
      ingredients: data.product_ingredients.map(pi => Ingredient.fromJSON(pi.ingredients))
    };
  }

  async findIngredientProducts(ingredientId: string): Promise<{ ingredient: Ingredient; products: Product[] }> {
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

    if (error) throw new DatabaseError(error.message);
    if (!data) throw new DatabaseError('Ingredient not found');

    return {
      ingredient: Ingredient.fromJSON(data),
      products: data.product_ingredients.map(pi => Product.fromJSON(pi.products))
    };
  }

  async findByProductAndIngredient(productId: string, ingredientId: string): Promise<ProductIngredient | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('product_id', productId)
      .eq('ingredient_id', ingredientId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? ProductIngredient.fromJSON(data) : null;
  }
} 