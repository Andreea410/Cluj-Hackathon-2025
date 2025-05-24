import { IBaseRepository } from './base.repository.interface';
import { Role } from '../../models/role.model';

export interface IRoleRepository extends IBaseRepository<Role> {
  findByName(name: string): Promise<Role | null>;
  findByPermission(permission: string): Promise<Role[]>;
} 