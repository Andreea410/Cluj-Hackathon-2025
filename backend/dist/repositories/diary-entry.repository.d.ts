import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IDiaryEntryRepository } from './interfaces/diary-entry.repository.interface';
import { DiaryEntry } from '../models/diary-entry.model';
export declare class DiaryEntryRepository extends BaseSupabaseRepository<DiaryEntry> implements IDiaryEntryRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<DiaryEntry[]>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DiaryEntry[]>;
    findByDate(userId: string, date: Date): Promise<DiaryEntry[]>;
    findLatestEntries(userId: string, limit: number): Promise<DiaryEntry[]>;
}
