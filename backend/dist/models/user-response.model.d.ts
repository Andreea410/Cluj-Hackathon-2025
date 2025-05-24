import { BaseModel } from './base.model';
import { User } from './user.model';
import { Question } from './question.model';
import { Option } from './option.model';
export declare class UserResponse extends BaseModel {
    user_id: string;
    question_id: string;
    option_id: string;
    auth_user_id: string;
    user?: User;
    question?: Question;
    option?: Option;
    constructor(partial: Partial<UserResponse>);
    toJSON(): {
        option: {
            text: string;
            question_id: string;
            created_at: Date;
        };
        question: Record<string, any>;
        user: {
            role: {
                name: string;
                permissions: string[];
            };
            email: string;
            hashed_password: string;
            role_id: string;
            first_name: string;
            last_name: string;
        };
        user_id: string;
        question_id: string;
        option_id: string;
        auth_user_id: string;
    };
    static fromJSON(json: any): UserResponse;
}
