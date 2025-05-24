import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IAgentLogRepository } from './interfaces/agent-log.repository.interface';
import { AgentLog } from '../models/agent-log.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class AgentLogRepository extends BaseSupabaseRepository<AgentLog> implements IAgentLogRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'agent_logs', AgentLog);
  }

  async findByUserId(userId: string): Promise<AgentLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AgentLog.fromJSON(item));
  }

  async findByRole(role: string): Promise<AgentLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AgentLog.fromJSON(item));
  }

  async findByUserAndRole(userId: string, role: string): Promise<AgentLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('role', role)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AgentLog.fromJSON(item));
  }

  async findWithUser(id: string): Promise<AgentLog | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? AgentLog.fromJSON(data) : null;
  }

  async findAllWithUsers(): Promise<AgentLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AgentLog.fromJSON(item));
  }

  async findLatestByUser(userId: string, limit: number): Promise<AgentLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AgentLog.fromJSON(item));
  }
} 