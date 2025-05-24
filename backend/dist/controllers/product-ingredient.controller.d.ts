import { ProductIngredientService } from '../services/product-ingredient.service';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';
import { Ingredient } from '../models/ingredient.model';
export declare class ProductIngredientController {
    private readonly productIngredientService;
    constructor(productIngredientService: ProductIngredientService);
    addIngredientToProduct(productId: string, ingredientId: string): Promise<ProductIngredient>;
    removeIngredientFromProduct(productId: string, ingredientId: string): Promise<void>;
    getProductIngredients(productId: string): Promise<{
        product: Product;
        ingredients: Ingredient[];
    }>;
    getIngredientProducts(ingredientId: string): Promise<{
        ingredient: Ingredient;
        products: Product[];
    }>;
    getProductIngredientsList(productId: string): Promise<ProductIngredient[]>;
    getIngredientProductsList(ingredientId: string): Promise<ProductIngredient[]>;
}
