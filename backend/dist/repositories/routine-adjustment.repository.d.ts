import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineAdjustmentRepository } from './interfaces/routine-adjustment.repository.interface';
import { RoutineAdjustment } from '../models/routine-adjustment.model';
export declare class RoutineAdjustmentRepository extends BaseSupabaseRepository<RoutineAdjustment> implements IRoutineAdjustmentRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<RoutineAdjustment[]>;
    findByPhotoAnalysisId(photoAnalysisId: string): Promise<RoutineAdjustment[]>;
    findByAuthUserId(authUserId: string): Promise<RoutineAdjustment[]>;
    findWithRelations(id: string): Promise<RoutineAdjustment | null>;
    findAllWithRelations(): Promise<RoutineAdjustment[]>;
}
