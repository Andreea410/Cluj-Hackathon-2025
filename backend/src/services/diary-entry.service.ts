import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { DiaryEntry } from '../models/diary-entry.model';
import { IDiaryEntryRepository } from '../repositories/interfaces/diary-entry.repository.interface';

@Injectable()
export class DiaryEntryService extends BaseService<DiaryEntry> {
  constructor(private readonly diaryEntryRepository: IDiaryEntryRepository) {
    super(diaryEntryRepository);
  }

  async createDiaryEntry(entry: DiaryEntry): Promise<DiaryEntry> {
    if (!entry.user_id) {
      throw new Error('User ID is required');
    }

    if (!entry.date) {
      entry.date = new Date();
    }

    entry.created_at = new Date();
    return this.create(entry);
  }

  async getUserEntries(userId: string): Promise<DiaryEntry[]> {
    return this.diaryEntryRepository.findByUserId(userId);
  }

  async getEntriesByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DiaryEntry[]> {
    if (startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }
    return this.diaryEntryRepository.findByDateRange(userId, startDate, endDate);
  }

  async getEntriesByDate(userId: string, date: Date): Promise<DiaryEntry[]> {
    return this.diaryEntryRepository.findByDate(userId, date);
  }

  async getLatestEntries(userId: string, limit: number = 10): Promise<DiaryEntry[]> {
    if (limit < 1) {
      throw new Error('Limit must be greater than 0');
    }
    return this.diaryEntryRepository.findLatestEntries(userId, limit);
  }

  async updateDiaryEntry(id: string, entry: Partial<DiaryEntry>): Promise<DiaryEntry> {
    const existingEntry = await this.findById(id);
    
    if (entry.user_id && entry.user_id !== existingEntry.user_id) {
      throw new Error('Cannot change the user ID of a diary entry');
    }

    return this.update(id, entry);
  }

  async deleteDiaryEntry(id: string, userId: string): Promise<void> {
    const entry = await this.findById(id);
    if (entry.user_id !== userId) {
      throw new Error('You can only delete your own diary entries');
    }
    await this.delete(id);
  }
} 