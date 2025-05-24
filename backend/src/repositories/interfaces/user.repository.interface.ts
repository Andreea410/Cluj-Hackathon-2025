import { IBaseRepository } from './base.repository.interface';
import { User } from '../../models/user.model';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByRoleId(roleId: string): Promise<User[]>;
  findWithRole(id: string): Promise<User | null>;
  findAllWithRoles(): Promise<User[]>;
} 