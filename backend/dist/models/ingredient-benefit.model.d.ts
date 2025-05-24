import { BaseModel } from './base.model';
export declare class IngredientBenefit extends BaseModel {
    ingredient_id: string;
    benefit_id: string;
    constructor(partial: Partial<IngredientBenefit>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): IngredientBenefit;
}
