import { BaseModel } from './base.model';
export declare class Reward extends BaseModel {
    name: string;
    description: string;
    threshold_points: number;
    constructor(partial: Partial<Reward>);
    toJSON(): {
        name: string;
        description: string;
        threshold_points: number;
    };
    static fromJSON(json: any): Reward;
}
