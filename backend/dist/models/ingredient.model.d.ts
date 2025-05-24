import { BaseModel } from './base.model';
export declare class Ingredient extends BaseModel {
    name: string;
    constructor(partial: Partial<Ingredient>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): Ingredient;
}
