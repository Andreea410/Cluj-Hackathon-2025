import { BaseModel } from './base.model';
import { User } from './user.model';
export interface RoutineStep {
    product_id: string;
    order: number;
    time_of_day: 'morning' | 'evening';
    instructions: string;
    completed: boolean;
    completed_at?: Date;
}
export declare class SkincareRoutine extends BaseModel {
    user_id: string;
    name: string;
    steps: RoutineStep[];
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    points_earned: number;
    user?: User;
    constructor(partial: Partial<SkincareRoutine>);
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
        name: string;
        steps: RoutineStep[];
        created_at: Date;
        updated_at: Date;
        is_active: boolean;
        points_earned: number;
    };
    static fromJSON(json: any): SkincareRoutine;
}
