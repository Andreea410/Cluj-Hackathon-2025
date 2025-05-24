import { BaseModel } from './base.model';
export declare class Question extends BaseModel {
    text: string;
    field_key: string;
    constructor(partial: Partial<Question>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): Question;
}
