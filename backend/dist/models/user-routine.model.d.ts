import { BaseModel } from './base.model';
import { User } from './user.model';
import { RoutineTemplate } from './routine-template.model';
export declare class UserRoutine extends BaseModel {
    user_id: string;
    routine_template_id: string;
    assigned_at: Date;
    auth_user_id: string;
    user?: User;
    routineTemplate?: RoutineTemplate;
    constructor(partial: Partial<UserRoutine>);
    toJSON(): {
        routineTemplate: Record<string, any>;
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
        routine_template_id: string;
        assigned_at: Date;
        auth_user_id: string;
    };
    static fromJSON(json: any): UserRoutine;
}
