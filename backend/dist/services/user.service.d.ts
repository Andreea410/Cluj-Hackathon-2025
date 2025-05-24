import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class UserService extends BaseService<User> {
    private readonly userRepository;
    private readonly supabase;
    private readonly logger;
    constructor(userRepository: UserRepository, supabase: SupabaseClient);
    private validateUserData;
    private ensureDefaultRole;
    createUser(userData: Partial<User> & {
        password: string;
    }): Promise<User>;
    updateUser(id: string, user: Partial<User>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByRoleId(roleId: string): Promise<User[]>;
    findWithRole(id: string): Promise<User | null>;
    findAllWithRoles(): Promise<User[]>;
    validatePassword(email: string, password: string): Promise<User | null>;
}
