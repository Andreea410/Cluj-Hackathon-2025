import { BaseModel } from './base.model';
export declare class Product extends BaseModel {
    name: string;
    brand_id: string;
    price: number;
    photo_url: string;
    description: string;
    stock: number;
    constructor(partial: Partial<Product>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): Product;
}
