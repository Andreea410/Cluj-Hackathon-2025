import { BaseModel } from './base.model';
import { Role } from './role.model';
export declare class User extends BaseModel {
    email: string;
    hashed_password: string;
    role_id: string;
    created_at: Date;
    role?: Role;
    constructor(partial: Partial<User>);
    toJSON(): {
        role: {
            name: string;
            permissions: string[];
        };
        email: string;
        hashed_password: string;
        role_id: string;
        created_at: Date;
    };
    static fromJSON(json: any): User;
}
