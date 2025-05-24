import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineStepRepository } from './interfaces/routine-step.repository.interface';
import { RoutineStep } from '../models/routine-step.model';
export declare class RoutineStepRepository extends BaseSupabaseRepository<RoutineStep> implements IRoutineStepRepository {
    constructor(supabase: SupabaseClient);
    findByRoutineTemplateId(routineTemplateId: string): Promise<RoutineStep[]>;
    findByStepNumber(routineTemplateId: string, stepNumber: number): Promise<RoutineStep | null>;
    findWithTemplate(id: string): Promise<RoutineStep | null>;
    findAllWithTemplate(): Promise<RoutineStep[]>;
    findAllByTemplateWithDetails(routineTemplateId: string): Promise<RoutineStep[]>;
    getMaxStepNumber(routineTemplateId: string): Promise<number>;
    reorderSteps(routineTemplateId: string, stepNumber: number): Promise<void>;
}
