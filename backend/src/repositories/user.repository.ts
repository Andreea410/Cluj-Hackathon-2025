import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from '../models/user.model';
import { DatabaseError } from '../shared/exceptions/database.error';
import { Role } from '../models/role.model';

@Injectable()
export class UserRepository extends BaseSupabaseRepository<User> implements IUserRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'users', User);
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      console.log(`Finding user by email: ${email}`);
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Error finding user by email:', error);
        throw new DatabaseError(error.message);
      }

      console.log('User lookup result:', data ? 'User found' : 'No user found');
      return data ? User.fromJSON(data) : null;
    } catch (error) {
      console.error('Error in findByEmail:', error);
      throw new DatabaseError(`Failed to find user by email: ${error.message}`);
    }
  }

  async findByRoleId(roleId: string): Promise<User[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('role_id', roleId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => User.fromJSON(item));
  }

  async findWithRole(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        role:roles(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? User.fromJSON(data) : null;
  }

  async findAllWithRoles(): Promise<User[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        role:roles(*)
      `);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => User.fromJSON(item));
  }

  async findRoleByName(name: string): Promise<Role | null> {
    try {
      console.log(`Finding role by name: ${name}`);
      const { data, error } = await this.supabase
        .from('roles')
        .select('*')
        .eq('name', name)
        .single();

      if (error) {
        console.error('Error finding role:', error);
        if (error.code === 'PGRST116') {
          return null;
        }
        throw new DatabaseError(error.message);
      }

      console.log('Found role:', data);
      return data ? Role.fromJSON(data) : null;
    } catch (error) {
      console.error('Error in findRoleByName:', error);
      throw new DatabaseError(`Failed to find role: ${error.message}`);
    }
  }

  async createRole(role: Role): Promise<Role> {
    try {
      console.log('Creating role:', role.toJSON());
      const { data, error } = await this.supabase
        .from('roles')
        .insert(role.toJSON())
        .select()
        .single();

      if (error) {
        console.error('Error creating role:', error);
        throw new DatabaseError(`Failed to create role: ${error.message}`);
      }

      if (!data) {
        console.error('No data returned after role creation');
        throw new DatabaseError('No data returned after role creation');
      }

      console.log('Created role:', data);
      return Role.fromJSON(data);
    } catch (error) {
      console.error('Error in createRole:', error);
      throw new DatabaseError(`Failed to create role: ${error.message}`);
    }
  }
} 