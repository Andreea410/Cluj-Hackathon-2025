import { BaseModel } from './base.model';
export declare class RoutineTemplate extends BaseModel {
    name: string;
    description: string;
    constructor(partial: Partial<RoutineTemplate>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): RoutineTemplate;
}
