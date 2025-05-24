import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IDiaryEntryRepository } from './interfaces/diary-entry.repository.interface';
import { DiaryEntry } from '../models/diary-entry.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class DiaryEntryRepository extends BaseSupabaseRepository<DiaryEntry> implements IDiaryEntryRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'diary_entries', DiaryEntry);
  }

  async findByUserId(userId: string): Promise<DiaryEntry[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => DiaryEntry.fromJSON(item));
  }

  async findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DiaryEntry[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => DiaryEntry.fromJSON(item));
  }

  async findByDate(userId: string, date: Date): Promise<DiaryEntry[]> {
    const dateString = date.toISOString().split('T')[0];
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('date', dateString)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => DiaryEntry.fromJSON(item));
  }

  async findLatestEntries(userId: string, limit: number): Promise<DiaryEntry[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => DiaryEntry.fromJSON(item));
  }
} 