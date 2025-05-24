import { BaseModel } from './base.model';
import { User } from './user.model';
export declare class PointTransaction extends BaseModel {
    user_id: string;
    points: number;
    auth_user_id: string;
    user?: User;
    constructor(partial: Partial<PointTransaction>);
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
        points: number;
        auth_user_id: string;
    };
    static fromJSON(json: any): PointTransaction;
}
