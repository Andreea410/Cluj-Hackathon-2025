import { BaseModel } from './base.model';
export declare class SideEffect extends BaseModel {
    name: string;
    description: string;
    constructor(partial: Partial<SideEffect>);
    toJSON(): {
        name: string;
        description: string;
    };
    static fromJSON(json: any): SideEffect;
}
