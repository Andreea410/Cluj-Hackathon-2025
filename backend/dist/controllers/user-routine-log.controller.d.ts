import { UserRoutineLogService } from '../services/user-routine-log.service';
import { UserRoutineLog } from '../models/user-routine-log.model';
export declare class UserRoutineLogController {
    private readonly userRoutineLogService;
    constructor(userRoutineLogService: UserRoutineLogService);
    logRoutineProgress(userRoutineLog: UserRoutineLog): Promise<UserRoutineLog>;
    bulkCreateLogs(userRoutineId: string, data: {
        logs: Array<{
            logDate: string;
            completedSteps: number;
        }>;
    }): Promise<UserRoutineLog[]>;
    getRoutineLog(id: string, includeRelations?: boolean): Promise<UserRoutineLog>;
    getRoutineLogs(userRoutineId?: string, authUserId?: string, includeRelations?: boolean, startDate?: string, endDate?: string, date?: string, limit?: number): Promise<UserRoutineLog[]>;
    getRoutineStats(userRoutineId: string): Promise<{
        totalLogs: number;
        averageCompletedSteps: number;
        completionRate: number;
        streakData: {
            currentStreak: number;
            longestStreak: number;
            lastLogDate: Date | null;
        };
    }>;
    updateRoutineLog(id: string, userRoutineLog: UserRoutineLog): Promise<UserRoutineLog>;
    deleteRoutineLog(id: string): Promise<void>;
}
