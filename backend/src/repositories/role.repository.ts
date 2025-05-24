import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoleRepository } from './interfaces/role.repository.interface';
import { Role } from '../models/role.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class RoleRepository extends BaseSupabaseRepository<Role> implements IRoleRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'roles', Role);
  }

  async findByName(name: string): Promise<Role | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Role.fromJSON(data) : null;
  }

  async findByPermission(permission: string): Promise<Role[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .contains('permissions', [permission]);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Role.fromJSON(item));
  }
} 