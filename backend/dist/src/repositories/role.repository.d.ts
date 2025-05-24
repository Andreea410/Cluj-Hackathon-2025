import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoleRepository } from './interfaces/role.repository.interface';
import { Role } from '../models/role.model';
export declare class RoleRepository extends BaseSupabaseRepository<Role> implements IRoleRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<Role | null>;
    findByPermission(permission: string): Promise<Role[]>;
}
