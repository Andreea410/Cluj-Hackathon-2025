import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { RoutineCompletion } from '../models/routine-completion.model';
export declare class RoutineCompletionRepository extends BaseSupabaseRepository<RoutineCompletion> {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<RoutineCompletion[]>;
    findByDate(userId: string, date: Date): Promise<RoutineCompletion | null>;
    updateCompletion(userId: string, date: Date, updates: Partial<RoutineCompletion>): Promise<RoutineCompletion>;
    createCompletion(completion: RoutineCompletion): Promise<RoutineCompletion>;
}
