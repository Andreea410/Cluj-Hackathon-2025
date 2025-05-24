import { BaseModel } from './base.model';
export interface QuestionnaireResponse {
    question_id: string;
    option_id?: string;
    value?: string;
}
export declare class SkinQuestionnaire extends BaseModel {
    user_id: string;
    responses: QuestionnaireResponse[];
    created_at: Date;
    constructor(partial: Partial<SkinQuestionnaire>);
    toJSON(): {
        user_id: string;
        responses: QuestionnaireResponse[];
        created_at: Date;
    };
    static fromJSON(json: any): SkinQuestionnaire;
}
