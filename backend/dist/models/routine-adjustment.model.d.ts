import { BaseModel } from './base.model';
import { User } from './user.model';
import { PhotoAnalysis } from './photo-analysis.model';
export declare class RoutineAdjustment extends BaseModel {
    user_id: string;
    photo_analysis_id: string;
    actions: Record<string, any>;
    auth_user_id?: string;
    user?: User;
    photoAnalysis?: PhotoAnalysis;
    constructor(partial: Partial<RoutineAdjustment>);
    toJSON(): {
        photoAnalysis: {
            photoUpload: {
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
                upload_date: Date;
                file_url: string;
                created_at: Date;
                auth_user_id: string;
            };
            photo_upload_id: string;
            analyzed_at: Date;
            metrics: Record<string, any>;
        };
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
        photo_analysis_id: string;
        actions: Record<string, any>;
        auth_user_id: string;
    };
    static fromJSON(json: any): RoutineAdjustment;
}
