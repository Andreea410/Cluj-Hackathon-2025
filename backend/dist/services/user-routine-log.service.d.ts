import { BaseService } from './base.service';
import { UserRoutineLog } from '../models/user-routine-log.model';
import { IUserRoutineLogRepository } from '../repositories/interfaces/user-routine-log.repository.interface';
export declare class UserRoutineLogService extends BaseService<UserRoutineLog> {
    private readonly userRoutineLogRepository;
    constructor(userRoutineLogRepository: IUserRoutineLogRepository);
    logRoutineProgress(userRoutineLog: UserRoutineLog): Promise<UserRoutineLog>;
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
        streakData: {
            currentStreak: number;
            longestStreak: number;
            lastLogDate: Date | null;
        };
    }>;
    findRecentLogs(limit?: number): Promise<UserRoutineLog[]>;
    findByDate(logDate: Date): Promise<UserRoutineLog[]>;
    updateRoutineLog(id: string, userRoutineLog: UserRoutineLog): Promise<UserRoutineLog>;
    bulkCreateLogs(userRoutineId: string, logs: Array<{
        logDate: Date;
        completedSteps: number;
    }>): Promise<UserRoutineLog[]>;
}
