import { BaseModel } from './base.model';
import { PhotoUpload } from './photo-upload.model';
export declare class PhotoAnalysis extends BaseModel {
    photo_upload_id: string;
    analyzed_at: Date;
    metrics: Record<string, any>;
    photoUpload?: PhotoUpload;
    constructor(partial: Partial<PhotoAnalysis>);
    toJSON(): {
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
    static fromJSON(json: any): PhotoAnalysis;
}
