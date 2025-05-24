import { IBaseRepository } from './base.repository.interface';
import { ProductIngredient } from '../../models/product-ingredient.model';
import { Product } from '../../models/product.model';
import { Ingredient } from '../../models/ingredient.model';

export interface IProductIngredientRepository extends IBaseRepository<ProductIngredient> {
  findByProductId(productId: string): Promise<ProductIngredient[]>;
  findByIngredientId(ingredientId: string): Promise<ProductIngredient[]>;
  findProductsWithIngredients(productId: string): Promise<{ product: Product; ingredients: Ingredient[] }>;
  findIngredientProducts(ingredientId: string): Promise<{ ingredient: Ingredient; products: Product[] }>;
  findByProductAndIngredient(productId: string, ingredientId: string): Promise<ProductIngredient | null>;
} 