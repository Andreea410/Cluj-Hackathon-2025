import { BaseModel } from './base.model';
import { UserRoutine } from './user-routine.model';
export declare class UserRoutineLog extends BaseModel {
    user_routine_id: string;
    log_date: Date;
    completed_steps: number;
    auth_user_id: string;
    userRoutine?: UserRoutine;
    constructor(partial: Partial<UserRoutineLog>);
    toJSON(): {
        userRoutine: {
            routineTemplate: Record<string, any>;
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
            routine_template_id: string;
            assigned_at: Date;
            auth_user_id: string;
        };
        user_routine_id: string;
        log_date: Date;
        completed_steps: number;
        auth_user_id: string;
    };
    static fromJSON(json: any): UserRoutineLog;
}
