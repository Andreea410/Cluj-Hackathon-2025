import { BaseModel } from './base.model';
import { User } from './user.model';
export interface AIMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
export interface SkinInformation {
    skin_type?: string;
    concerns?: string[];
    allergies?: string[];
    current_products?: string[];
    additional_notes?: string;
}
export declare class SkinAnalysis extends BaseModel {
    user_id: string;
    messages: AIMessage[];
    skin_info: SkinInformation;
    created_at: Date;
    updated_at: Date;
    user?: User;
    constructor(partial: Partial<SkinAnalysis>);
    toJSON(): {
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
        messages: AIMessage[];
        skin_info: SkinInformation;
        created_at: Date;
        updated_at: Date;
    };
    static fromJSON(json: any): SkinAnalysis;
}
