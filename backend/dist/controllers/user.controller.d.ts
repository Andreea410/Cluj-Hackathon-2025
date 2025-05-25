import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    private readonly supabase;
    constructor(userService: UserService, supabase: SupabaseClient);
    ping(): {
        message: string;
    };
    testRoute(): {
        message: string;
    };
    getMorningRoutineProducts(userId: string, request: Request): Promise<{
        id: any;
        name: any;
        photo_url: any;
    }[]>;
    getNightRoutineProducts(userId: string, request: Request): Promise<{
        id: any;
        name: any;
        photo_url: any;
    }[]>;
    getUser(id: string, includeRole?: boolean): Promise<User>;
    getAllUsers(roleId?: string, includeRoles?: boolean): Promise<User[]>;
    updateUser(id: string, user: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    validateUser(email: string, password: string): Promise<User | null>;
}
