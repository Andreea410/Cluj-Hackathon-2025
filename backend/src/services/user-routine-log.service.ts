import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserRoutineLog } from '../models/user-routine-log.model';
import { IUserRoutineLogRepository } from '../repositories/interfaces/user-routine-log.repository.interface';

@Injectable()
export class UserRoutineLogService extends BaseService<UserRoutineLog> {
  constructor(private readonly userRoutineLogRepository: IUserRoutineLogRepository) {
    super(userRoutineLogRepository);
  }

  async logRoutineProgress(userRoutineLog: UserRoutineLog): Promise<UserRoutineLog> {
    // Check if log already exists for this date
    const existing = await this.userRoutineLogRepository.findByUserRoutineAndDate(
      userRoutineLog.user_routine_id,
      userRoutineLog.log_date
    );

    if (existing) {
      throw new Error('Log already exists for this date');
    }

    // Validate completed steps
    if (userRoutineLog.completed_steps < 0) {
      throw new Error('Completed steps cannot be negative');
    }

    return this.create(userRoutineLog);
  }

  async findByUserRoutineId(userRoutineId: string): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findByUserRoutineId(userRoutineId);
  }

  async findByAuthUserId(authUserId: string): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findByAuthUserId(authUserId);
  }

  async findByUserRoutineAndDate(userRoutineId: string, logDate: Date): Promise<UserRoutineLog | null> {
    return this.userRoutineLogRepository.findByUserRoutineAndDate(userRoutineId, logDate);
  }

  async findWithRelations(id: string): Promise<UserRoutineLog | null> {
    return this.userRoutineLogRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findAllWithRelations();
  }

  async findAllByUserRoutineWithDetails(userRoutineId: string): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findAllByUserRoutineWithDetails(userRoutineId);
  }

  async findAllBetweenDates(startDate: Date, endDate: Date): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findAllBetweenDates(startDate, endDate);
  }

  async findAllByUserRoutineBetweenDates(
    userRoutineId: string,
    startDate: Date,
    endDate: Date
  ): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findAllByUserRoutineBetweenDates(userRoutineId, startDate, endDate);
  }

  async getCompletionStats(userRoutineId: string): Promise<{
    totalLogs: number;
    averageCompletedSteps: number;
    completionRate: number;
    streakData: {
      currentStreak: number;
      longestStreak: number;
      lastLogDate: Date | null;
    };
  }> {
    const stats = await this.userRoutineLogRepository.getCompletionStats(userRoutineId);
    const logs = await this.findByUserRoutineId(userRoutineId);
    
    // Calculate streak data
    let currentStreak = 0;
    let longestStreak = 0;
    let lastLogDate: Date | null = null;

    if (logs.length > 0) {
      logs.sort((a, b) => b.log_date.getTime() - a.log_date.getTime());
      lastLogDate = logs[0].log_date;

      let streak = 0;
      let prevDate: Date | null = null;

      for (const log of logs) {
        if (!prevDate) {
          streak = 1;
        } else {
          const diffDays = Math.floor((prevDate.getTime() - log.log_date.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            streak++;
          } else {
            longestStreak = Math.max(longestStreak, streak);
            streak = 1;
          }
        }
        prevDate = log.log_date;
      }

      longestStreak = Math.max(longestStreak, streak);
      
      // Calculate current streak
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - lastLogDate.getTime()) / (1000 * 60 * 60 * 24));
      currentStreak = diffDays <= 1 ? streak : 0;
    }

    return {
      ...stats,
      streakData: {
        currentStreak,
        longestStreak,
        lastLogDate
      }
    };
  }

  async findRecentLogs(limit?: number): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findRecentLogs(limit);
  }

  async findByDate(logDate: Date): Promise<UserRoutineLog[]> {
    return this.userRoutineLogRepository.findByDate(logDate);
  }

  async updateRoutineLog(id: string, userRoutineLog: UserRoutineLog): Promise<UserRoutineLog> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('User routine log not found');
    }

    // If changing date, check for existing log
    if (
      userRoutineLog.log_date.getTime() !== existing.log_date.getTime() &&
      await this.findByUserRoutineAndDate(userRoutineLog.user_routine_id, userRoutineLog.log_date)
    ) {
      throw new Error('Log already exists for this date');
    }

    // Validate completed steps
    if (userRoutineLog.completed_steps < 0) {
      throw new Error('Completed steps cannot be negative');
    }

    return this.update(id, userRoutineLog);
  }

  async bulkCreateLogs(
    userRoutineId: string,
    logs: Array<{ logDate: Date; completedSteps: number }>
  ): Promise<UserRoutineLog[]> {
    const results: UserRoutineLog[] = [];

    for (const log of logs) {
      try {
        const userRoutineLog = await this.logRoutineProgress(new UserRoutineLog({
          user_routine_id: userRoutineId,
          log_date: log.logDate,
          completed_steps: log.completedSteps
        }));
        results.push(userRoutineLog);
      } catch (error) {
        // Skip if log already exists
        if (!error.message.includes('already exists')) {
          throw error;
        }
      }
    }

    return results;
  }
} 