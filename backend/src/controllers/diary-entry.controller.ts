import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DiaryEntryService } from '../services/diary-entry.service';
import { DiaryEntry } from '../models/diary-entry.model';

@Controller('diary-entries')
export class DiaryEntryController {
  constructor(private readonly diaryEntryService: DiaryEntryService) {}

  @Post()
  async createEntry(@Body() entry: DiaryEntry): Promise<DiaryEntry> {
    try {
      return await this.diaryEntryService.createDiaryEntry(entry);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('user/:userId')
  async getUserEntries(
    @Param('userId') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('date') date?: string,
    @Query('limit') limit?: number
  ): Promise<DiaryEntry[]> {
    try {
      if (startDate && endDate) {
        return await this.diaryEntryService.getEntriesByDateRange(
          userId,
          new Date(startDate),
          new Date(endDate)
        );
      }

      if (date) {
        return await this.diaryEntryService.getEntriesByDate(
          userId,
          new Date(date)
        );
      }

      if (limit) {
        return await this.diaryEntryService.getLatestEntries(userId, limit);
      }

      return await this.diaryEntryService.getUserEntries(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getEntry(@Param('id') id: string): Promise<DiaryEntry> {
    try {
      return await this.diaryEntryService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateEntry(
    @Param('id') id: string,
    @Body() entry: Partial<DiaryEntry>
  ): Promise<DiaryEntry> {
    try {
      return await this.diaryEntryService.updateDiaryEntry(id, entry);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteEntry(
    @Param('id') id: string,
    @Query('userId') userId: string
  ): Promise<void> {
    try {
      await this.diaryEntryService.deleteDiaryEntry(id, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
} 