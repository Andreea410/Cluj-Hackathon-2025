import { IBaseRepository } from './base.repository.interface';
import { DiaryEntry } from '../../models/diary-entry.model';
export interface IDiaryEntryRepository extends IBaseRepository<DiaryEntry> {
    findByUserId(userId: string): Promise<DiaryEntry[]>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DiaryEntry[]>;
    findByDate(userId: string, date: Date): Promise<DiaryEntry[]>;
    findLatestEntries(userId: string, limit: number): Promise<DiaryEntry[]>;
}
