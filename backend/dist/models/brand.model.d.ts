import { BaseModel } from './base.model';
export declare class Brand extends BaseModel {
    name: string;
    website: string;
    logo_url: string;
    constructor(partial: Partial<Brand>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): Brand;
}
