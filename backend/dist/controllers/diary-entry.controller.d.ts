import { DiaryEntryService } from '../services/diary-entry.service';
import { DiaryEntry } from '../models/diary-entry.model';
export declare class DiaryEntryController {
    private readonly diaryEntryService;
    constructor(diaryEntryService: DiaryEntryService);
    createEntry(entry: DiaryEntry): Promise<DiaryEntry>;
    getUserEntries(userId: string, startDate?: string, endDate?: string, date?: string, limit?: number): Promise<DiaryEntry[]>;
    getEntry(id: string): Promise<DiaryEntry>;
    updateEntry(id: string, entry: Partial<DiaryEntry>): Promise<DiaryEntry>;
    deleteEntry(id: string, userId: string): Promise<void>;
}
