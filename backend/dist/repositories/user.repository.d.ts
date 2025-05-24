import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
export declare class UserRepository extends BaseSupabaseRepository<User> implements IUserRepository {
    constructor(supabase: SupabaseClient);
    findByEmail(email: string): Promise<User | null>;
    findByRoleId(roleId: string): Promise<User[]>;
    findWithRole(id: string): Promise<User | null>;
    findAllWithRoles(): Promise<User[]>;
    findRoleByName(name: string): Promise<Role | null>;
    createRole(role: Role): Promise<Role>;
}
