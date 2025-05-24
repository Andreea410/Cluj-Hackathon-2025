import { BaseModel } from './base.model';
export declare class Plan extends BaseModel {
    name: string;
    price_per_month: number;
    features: any[];
    constructor(partial: Partial<Plan>);
    toJSON(): {
        name: string;
        price_per_month: number;
        features: any[];
    };
    static fromJSON(json: any): Plan;
}
