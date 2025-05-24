import { IBaseRepository } from './base.repository.interface';
import { UserRoutineLog } from '../../models/user-routine-log.model';

export interface IUserRoutineLogRepository extends IBaseRepository<UserRoutineLog> {
  findByUserRoutineId(userRoutineId: string): Promise<UserRoutineLog[]>;
  findByAuthUserId(authUserId: string): Promise<UserRoutineLog[]>;
  findByUserRoutineAndDate(userRoutineId: string, logDate: Date): Promise<UserRoutineLog | null>;
  findWithRelations(id: string): Promise<UserRoutineLog | null>;
  findAllWithRelations(): Promise<UserRoutineLog[]>;
  findAllByUserRoutineWithDetails(userRoutineId: string): Promise<UserRoutineLog[]>;
  findAllBetweenDates(startDate: Date, endDate: Date): Promise<UserRoutineLog[]>;
  findAllByUserRoutineBetweenDates(userRoutineId: string, startDate: Date, endDate: Date): Promise<UserRoutineLog[]>;
  getCompletionStats(userRoutineId: string): Promise<{
    totalLogs: number;
    averageCompletedSteps: number;
    completionRate: number;
  }>;
  findRecentLogs(limit?: number): Promise<UserRoutineLog[]>;
  findByDate(logDate: Date): Promise<UserRoutineLog[]>;
} 