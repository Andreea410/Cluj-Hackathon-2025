import { BaseService } from './base.service';
import { Ingredient } from '../models/ingredient.model';
import { IIngredientRepository } from '../repositories/interfaces/ingredient.repository.interface';
export declare class IngredientService extends BaseService<Ingredient> {
    private readonly ingredientRepository;
    constructor(ingredientRepository: IIngredientRepository);
    createIngredient(ingredient: Ingredient): Promise<Ingredient>;
    updateIngredient(id: string, ingredient: Partial<Ingredient>): Promise<Ingredient>;
}
