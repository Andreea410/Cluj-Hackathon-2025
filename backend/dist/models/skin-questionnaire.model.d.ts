import { BaseModel } from './base.model';
import { User } from './user.model';
export interface QuestionnaireResponse {
    question_id: string;
    answer: string;
}
export declare class SkinQuestionnaire extends BaseModel {
    user_id: string;
    responses: QuestionnaireResponse[];
    created_at: Date;
    user?: User;
    constructor(partial: Partial<SkinQuestionnaire>);
    toJSON(): {
        user: {
            role: {
                name: string;
                permissions: string[];
            };
            email: string;
            hashed_password: string;
            role_id: string;
            created_at: Date;
            first_name: string;
            last_name: string;
        };
        user_id: string;
        responses: QuestionnaireResponse[];
        created_at: Date;
    };
    static fromJSON(json: any): SkinQuestionnaire;
}
