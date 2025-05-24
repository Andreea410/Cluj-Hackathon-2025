import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRole(role: Role): Promise<Role>;
    getRole(id: string): Promise<Role>;
    getAllRoles(permission?: string): Promise<Role[]>;
    updateRole(id: string, role: Partial<Role>): Promise<Role>;
    deleteRole(id: string): Promise<void>;
    addPermission(id: string, permission: string): Promise<Role>;
    removePermission(id: string, permission: string): Promise<Role>;
}
