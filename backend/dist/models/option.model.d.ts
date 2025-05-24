import { BaseModel } from './base.model';
export declare class Option extends BaseModel {
    text: string;
    question_id: string;
    created_at: Date;
    constructor(partial: Partial<Option>);
    toJSON(): {
        text: string;
        question_id: string;
        created_at: Date;
    };
    static fromJSON(json: any): Option;
}
