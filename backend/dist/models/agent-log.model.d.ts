import { BaseModel } from './base.model';
import { User } from './user.model';
export declare class AgentLog extends BaseModel {
    user_id: string;
    role: string;
    message: Record<string, any>;
    user?: User;
    constructor(partial: Partial<AgentLog>);
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
        role: string;
        message: Record<string, any>;
    };
    static fromJSON(json: any): AgentLog;
}
