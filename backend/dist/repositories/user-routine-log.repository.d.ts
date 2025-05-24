import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserRoutineLogRepository } from './interfaces/user-routine-log.repository.interface';
import { UserRoutineLog } from '../models/user-routine-log.model';
export declare class UserRoutineLogRepository extends BaseSupabaseRepository<UserRoutineLog> implements IUserRoutineLogRepository {
    constructor(supabase: SupabaseClient);
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
