import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../models/ingredient.model';
export declare class IngredientController {
    private readonly ingredientService;
    constructor(ingredientService: IngredientService);
    createIngredient(ingredient: Ingredient): Promise<Ingredient>;
    getIngredient(id: string): Promise<Ingredient>;
    getAllIngredients(): Promise<Ingredient[]>;
    updateIngredient(id: string, ingredient: Partial<Ingredient>): Promise<Ingredient>;
    deleteIngredient(id: string): Promise<void>;
}
