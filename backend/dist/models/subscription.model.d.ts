import { BaseModel } from './base.model';
import { User } from './user.model';
import { Plan } from './plan.model';
export declare class Subscription extends BaseModel {
    user_id: string;
    plan_id: string;
    start_date: Date;
    end_date?: Date;
    status: string;
    auth_user_id?: string;
    user?: User;
    plan?: Plan;
    constructor(partial: Partial<Subscription>);
    toJSON(): {
        plan: {
            name: string;
            price_per_month: number;
            features: any[];
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
        };
        user_id: string;
        plan_id: string;
        start_date: Date;
        end_date: Date;
        status: string;
        auth_user_id: string;
    };
    static fromJSON(json: any): Subscription;
}
