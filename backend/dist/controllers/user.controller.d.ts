import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: Partial<User> & {
        password: string;
    }): Promise<User>;
    getUser(id: string, includeRole?: boolean): Promise<User>;
    getAllUsers(roleId?: string, includeRoles?: boolean): Promise<User[]>;
    updateUser(id: string, user: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    validateUser(email: string, password: string): Promise<User | null>;
}
