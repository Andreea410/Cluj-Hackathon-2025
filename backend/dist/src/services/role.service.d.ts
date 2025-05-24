import { BaseService } from './base.service';
import { Role } from '../models/role.model';
import { IRoleRepository } from '../repositories/interfaces/role.repository.interface';
export declare class RoleService extends BaseService<Role> {
    private readonly roleRepository;
    constructor(roleRepository: IRoleRepository);
    createRole(role: Role): Promise<Role>;
    updateRole(id: string, role: Partial<Role>): Promise<Role>;
    findByPermission(permission: string): Promise<Role[]>;
    addPermission(id: string, permission: string): Promise<Role>;
    removePermission(id: string, permission: string): Promise<Role>;
}
