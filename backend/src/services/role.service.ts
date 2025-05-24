import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Role } from '../models/role.model';
import { IRoleRepository } from '../repositories/interfaces/role.repository.interface';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(private readonly roleRepository: IRoleRepository) {
    super(roleRepository);
  }

  async createRole(role: Role): Promise<Role> {
    const existingRole = await this.roleRepository.findByName(role.name);
    if (existingRole) {
      throw new Error('A role with this name already exists');
    }

    return this.create(role);
  }

  async updateRole(id: string, role: Partial<Role>): Promise<Role> {
    if (role.name) {
      const existingRole = await this.roleRepository.findByName(role.name);
      if (existingRole && existingRole.id !== id) {
        throw new Error('A role with this name already exists');
      }
    }

    return this.update(id, role);
  }

  async findByPermission(permission: string): Promise<Role[]> {
    return this.roleRepository.findByPermission(permission);
  }

  async addPermission(id: string, permission: string): Promise<Role> {
    const role = await this.findById(id);
    if (!role.permissions.includes(permission)) {
      role.permissions.push(permission);
      return this.update(id, { permissions: role.permissions });
    }
    return role;
  }

  async removePermission(id: string, permission: string): Promise<Role> {
    const role = await this.findById(id);
    role.permissions = role.permissions.filter(p => p !== permission);
    return this.update(id, { permissions: role.permissions });
  }
} 