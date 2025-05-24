import { Injectable, Logger, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { BaseService } from './base.service';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { Role } from '../models/role.model';
import { SupabaseClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(SupabaseClient) private readonly supabase: SupabaseClient
  ) {
    super(userRepository);
  }

  private validateUserData(userData: Partial<User> & { password: string }): void {
    if (!userData.email) {
      throw new BadRequestException('Email is required');
    }
    if (!userData.password) {
      throw new BadRequestException('Password is required');
    }
    if (!userData.first_name) {
      throw new BadRequestException('First name is required');
    }
    if (!userData.last_name) {
      throw new BadRequestException('Last name is required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Validate password strength
    if (userData.password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }
  }

  private async ensureDefaultRole(): Promise<string> {
    try {
      this.logger.debug('Checking for default user role...');
      
      // Try to find the default user role
      this.logger.debug('Attempting to find role by name: user');
      const defaultRole = await this.userRepository.findRoleByName('user');
      
      if (defaultRole) {
        this.logger.debug(`Found existing default role with ID: ${defaultRole.id}`);
        return defaultRole.id;
      }

      this.logger.debug('Default role not found, creating new role...');
      
      // Create new role with basic permissions
      const newRole = new Role({
        name: 'user',
        permissions: ['read:own_profile', 'write:own_profile']
      });

      this.logger.debug(`Attempting to create new role: ${JSON.stringify(newRole.toJSON())}`);

      try {
        const createdRole = await this.userRepository.createRole(newRole);
        this.logger.debug('Role creation response:', createdRole);
        
        if (!createdRole || !createdRole.id) {
          this.logger.error('Role creation succeeded but no role ID was returned');
          throw new Error('Role creation succeeded but no role ID was returned');
        }
        
        this.logger.debug(`Successfully created new role with ID: ${createdRole.id}`);
        return createdRole.id;
      } catch (createError) {
        this.logger.error('Error creating role:', createError);
        
        this.logger.debug('Retrying to find role after creation error...');
        const retryRole = await this.userRepository.findRoleByName('user');
        
        if (retryRole && retryRole.id) {
          this.logger.debug(`Found role on retry with ID: ${retryRole.id}`);
          return retryRole.id;
        }
        
        throw new BadRequestException(`Failed to create or find user role: ${createError.message}`);
      }
    } catch (error) {
      this.logger.error('Error in ensureDefaultRole:', error);
      throw new BadRequestException(`Failed to set up user role: ${error.message}`);
    }
  }

  async createUser(userData: Partial<User> & { password: string }): Promise<User> {
    try {
      const { role_id, ...cleanUserData } = userData;
      console.log('[createUser] Incoming data:', { ...cleanUserData, password: '[REDACTED]' });
      this.logger.debug(`Creating user with data: ${JSON.stringify({ ...cleanUserData, password: '[REDACTED]' })}`);
      this.validateUserData(cleanUserData);
      this.logger.debug('User data validation passed');
      console.log('[createUser] Validation passed');
      const existingUser = await this.userRepository.findByEmail(cleanUserData.email);
      if (existingUser) {
        this.logger.warn(`User with email ${cleanUserData.email} already exists`);
        console.log('[createUser] User already exists in DB');
        throw new BadRequestException('A user with this email already exists');
      }
      this.logger.debug('No existing user found with this email');
      console.log('[createUser] No existing user found');
      const roleId = await this.ensureDefaultRole();
      if (!roleId) {
        console.log('[createUser] No roleId found');
        throw new BadRequestException('Failed to get or create user role');
      }
      this.logger.debug(`Using role ID: ${roleId}`);
      console.log('[createUser] Registering with Supabase Auth...');
      // Register with Supabase Auth
      const { data, error } = await this.supabase.auth.signUp({
        email: cleanUserData.email,
        password: cleanUserData.password,
        options: {
          data: {
            first_name: cleanUserData.first_name,
            last_name: cleanUserData.last_name,
          }
        }
      });
      if (error) {
        this.logger.error('Supabase Auth error:', error);
        console.log('[createUser] Supabase Auth error:', error);
        throw new BadRequestException(error.message || JSON.stringify(error));
      }
      if (!data.user) {
        console.log('[createUser] Supabase Auth did not return a user:', data);
        throw new BadRequestException('Supabase Auth did not return a user');
      }
      console.log('[createUser] Supabase Auth user created:', data.user.id);
      // Insert into users table
      const user = new User({
        id: data.user.id,
        email: cleanUserData.email,
        first_name: cleanUserData.first_name,
        last_name: cleanUserData.last_name,
        role_id: roleId
      });
      console.log('[createUser] Inserting user into users table:', user);
      const createdUser = await this.create(user);
      if (!createdUser || !createdUser.id) {
        this.logger.error('User creation succeeded but no user ID was returned');
        console.log('[createUser] User creation succeeded but no user ID was returned');
        throw new Error('User creation succeeded but no user ID was returned');
      }
      this.logger.debug(`User created successfully with ID: ${createdUser.id}`);
      console.log('[createUser] User created successfully with ID:', createdUser.id);
      return createdUser;
    } catch (error) {
      this.logger.error('Error creating user:', error);
      console.log('[createUser] Caught error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    if (user.email) {
      const existingUser = await this.userRepository.findByEmail(user.email);
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('A user with this email already exists');
      }
    }

    // Hash the password if it's being updated
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.hashed_password = await bcrypt.hash(user.password, salt);
      delete user.password;
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