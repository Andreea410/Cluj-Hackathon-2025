import { BaseModel } from './base.model';
export declare class AnswerOption extends BaseModel {
    question_id: string;
    value: string;
    constructor(partial: Partial<AnswerOption>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): AnswerOption;
}
