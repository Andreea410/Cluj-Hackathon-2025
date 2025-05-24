import { BaseService } from './base.service';
import { DiaryEntry } from '../models/diary-entry.model';
import { IDiaryEntryRepository } from '../repositories/interfaces/diary-entry.repository.interface';
export declare class DiaryEntryService extends BaseService<DiaryEntry> {
    private readonly diaryEntryRepository;
    constructor(diaryEntryRepository: IDiaryEntryRepository);
    createDiaryEntry(entry: DiaryEntry): Promise<DiaryEntry>;
    getUserEntries(userId: string): Promise<DiaryEntry[]>;
    getEntriesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DiaryEntry[]>;
    getEntriesByDate(userId: string, date: Date): Promise<DiaryEntry[]>;
    getLatestEntries(userId: string, limit?: number): Promise<DiaryEntry[]>;
    updateDiaryEntry(id: string, entry: Partial<DiaryEntry>): Promise<DiaryEntry>;
    deleteDiaryEntry(id: string, userId: string): Promise<void>;
}
