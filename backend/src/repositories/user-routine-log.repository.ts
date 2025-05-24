import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRoutineLogRepository } from './interfaces/user-routine-log.repository.interface';
import { UserRoutineLog } from '../models/user-routine-log.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class UserRoutineLogRepository extends BaseSupabaseRepository<UserRoutineLog> implements IUserRoutineLogRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'user_routine_logs', UserRoutineLog);
  }

  async findByUserRoutineId(userRoutineId: string): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_routine_id', userRoutineId)
      .order('log_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId)
      .order('log_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async findByUserRoutineAndDate(userRoutineId: string, logDate: Date): Promise<UserRoutineLog | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_routine_id', userRoutineId)
      .eq('log_date', logDate.toISOString().split('T')[0])
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? UserRoutineLog.fromJSON(data) : null;
  }

  async findWithRelations(id: string): Promise<UserRoutineLog | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user_routine:user_routine_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? UserRoutineLog.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user_routine:user_routine_id (*)
      `)
      .order('log_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async findAllByUserRoutineWithDetails(userRoutineId: string): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user_routine:user_routine_id (*)
      `)
      .eq('user_routine_id', userRoutineId)
      .order('log_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async findAllBetweenDates(startDate: Date, endDate: Date): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('log_date', startDate.toISOString().split('T')[0])
      .lte('log_date', endDate.toISOString().split('T')[0])
      .order('log_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async findAllByUserRoutineBetweenDates(
    userRoutineId: string,
    startDate: Date,
    endDate: Date
  ): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_routine_id', userRoutineId)
      .gte('log_date', startDate.toISOString().split('T')[0])
      .lte('log_date', endDate.toISOString().split('T')[0])
      .order('log_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async getCompletionStats(userRoutineId: string): Promise<{
    totalLogs: number;
    averageCompletedSteps: number;
    completionRate: number;
  }> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('completed_steps')
      .eq('user_routine_id', userRoutineId);

    if (error) throw new DatabaseError(error.message);

    const totalLogs = data.length;
    const totalSteps = data.reduce((sum, log) => sum + log.completed_steps, 0);
    const averageCompletedSteps = totalLogs > 0 ? totalSteps / totalLogs : 0;
    const completionRate = totalLogs > 0 ? (totalSteps / (totalLogs * 100)) * 100 : 0;

    return {
      totalLogs,
      averageCompletedSteps,
      completionRate
    };
  }

  async findRecentLogs(limit: number = 10): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user_routine:user_routine_id (*)
      `)
      .order('log_date', { ascending: false })
      .limit(limit);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }

  async findByDate(logDate: Date): Promise<UserRoutineLog[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('log_date', logDate.toISOString().split('T')[0])
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserRoutineLog.fromJSON(item));
  }
} 