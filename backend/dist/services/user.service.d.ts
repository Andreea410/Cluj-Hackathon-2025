import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
export declare class UserService extends BaseService<User> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
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
