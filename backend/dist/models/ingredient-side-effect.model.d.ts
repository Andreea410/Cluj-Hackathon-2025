import { BaseModel } from './base.model';
import { Ingredient } from './ingredient.model';
import { SideEffect } from './side-effect.model';
export declare class IngredientSideEffect extends BaseModel {
    ingredient_id: string;
    side_effect_id: string;
    ingredient?: Ingredient;
    sideEffect?: SideEffect;
    constructor(partial: Partial<IngredientSideEffect>);
    toJSON(): {
        sideEffect: {
            name: string;
            description: string;
        };
        ingredient: Record<string, any>;
        ingredient_id: string;
        side_effect_id: string;
    };
    static fromJSON(json: any): IngredientSideEffect;
}
