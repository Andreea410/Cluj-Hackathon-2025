import { BaseModel } from './base.model';
import { User } from './user.model';
export declare class RoutineCompletion extends BaseModel {
    user_id: string;
    date: Date;
    morning_completed: boolean;
    night_completed: boolean;
    points_awarded: boolean;
    user?: User;
    constructor(partial: Partial<RoutineCompletion>);
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
        date: Date;
        morning_completed: boolean;
        night_completed: boolean;
        points_awarded: boolean;
    };
    static fromJSON(json: any): RoutineCompletion;
}
