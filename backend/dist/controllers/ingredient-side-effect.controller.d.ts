import { IngredientSideEffectService } from '../services/ingredient-side-effect.service';
import { IngredientSideEffect } from '../models/ingredient-side-effect.model';
export declare class IngredientSideEffectController {
    private readonly ingredientSideEffectService;
    constructor(ingredientSideEffectService: IngredientSideEffectService);
    createIngredientSideEffect(ingredientSideEffect: IngredientSideEffect): Promise<IngredientSideEffect>;
    bulkCreateIngredientSideEffects(data: {
        ingredientId: string;
        sideEffectIds: string[];
    }): Promise<IngredientSideEffect[]>;
    getIngredientSideEffect(id: string, includeRelations?: boolean): Promise<IngredientSideEffect>;
    getAllIngredientSideEffects(ingredientId?: string, sideEffectId?: string, includeRelations?: boolean, includeSideEffects?: boolean, includeIngredients?: boolean): Promise<IngredientSideEffect[]>;
    updateIngredientSideEffect(id: string, ingredientSideEffect: Partial<IngredientSideEffect>): Promise<IngredientSideEffect>;
    deleteIngredientSideEffect(id: string): Promise<void>;
}
