import { BaseModel } from './base.model';
export declare class Benefit extends BaseModel {
    name: string;
    description: string;
    constructor(partial: Partial<Benefit>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): Benefit;
}
