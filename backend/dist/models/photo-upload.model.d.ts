import { BaseModel } from './base.model';
import { User } from './user.model';
export declare class PhotoUpload extends BaseModel {
    user_id: string;
    upload_date: Date;
    file_url: string;
    created_at: Date;
    auth_user_id?: string;
    user?: User;
    constructor(partial: Partial<PhotoUpload>);
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
        upload_date: Date;
        file_url: string;
        created_at: Date;
        auth_user_id: string;
    };
    static fromJSON(json: any): PhotoUpload;
}
