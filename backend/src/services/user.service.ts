import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async createUser(userData: Partial<User> & { password: string }): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    // Hash the password first
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(userData.password, salt);

    // Create a new user instance with the hashed password
    const user = new User({
      ...userData,
      hashed_password,
      created_at: new Date(),
      role_id: userData.role_id || 'user' // Default role if not provided
    });

    return this.create(user);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    if (user.email) {
      const existingUser = await this.userRepository.findByEmail(user.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('A user with this email already exists');
      }
    }

    // Hash the password if it's being updated
    if (user.hashed_password) {
      const salt = await bcrypt.genSalt();
      user.hashed_password = await bcrypt.hash(user.hashed_password, salt);
    }

    return this.update(id, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByRoleId(roleId: string): Promise<User[]> {
    return this.userRepository.findByRoleId(roleId);
  }

  async findWithRole(id: string): Promise<User | null> {
    return this.userRepository.findWithRole(id);
  }

  async findAllWithRoles(): Promise<User[]> {
    return this.userRepository.findAllWithRoles();
  }

  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.hashed_password);
    return isValid ? user : null;
  }
} 