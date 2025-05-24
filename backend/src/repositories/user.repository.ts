import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRepository } from './interfaces/user.repository.interface';
import { User } from '../models/user.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class UserRepository extends BaseSupabaseRepository<User> implements IUserRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'users', User);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? User.fromJSON(data) : null;
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
        role:role_id (*)
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
        role:role_id (*)
      `);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => User.fromJSON(item));
  }
} 