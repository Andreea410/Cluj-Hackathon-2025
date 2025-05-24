import { BaseModel } from './base.model';
import { User } from './user.model';
export interface SkinConcern {
    type: string;
    severity: 'mild' | 'moderate' | 'severe';
    description?: string;
}
export interface SkinType {
    type: 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';
    description?: string;
}
export declare class SkinProfile extends BaseModel {
    user_id: string;
    skin_type: SkinType;
    concerns: SkinConcern[];
    breakouts_frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
    allergies: string[];
    current_products: string[];
    created_at: Date;
    updated_at: Date;
    user?: User;
    constructor(partial: Partial<SkinProfile>);
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
        skin_type: SkinType;
        concerns: SkinConcern[];
        breakouts_frequency: "rare" | "occasional" | "frequent" | "constant";
        allergies: string[];
        current_products: string[];
        created_at: Date;
        updated_at: Date;
    };
    static fromJSON(json: any): SkinProfile;
}
