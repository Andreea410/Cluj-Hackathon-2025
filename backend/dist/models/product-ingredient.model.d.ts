import { BaseModel } from './base.model';
export declare class ProductIngredient extends BaseModel {
    product_id: string;
    ingredient_id: string;
    constructor(partial: Partial<ProductIngredient>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): ProductIngredient;
}
