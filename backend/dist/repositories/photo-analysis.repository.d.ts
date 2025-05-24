import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPhotoAnalysisRepository } from './interfaces/photo-analysis.repository.interface';
import { PhotoAnalysis } from '../models/photo-analysis.model';
export declare class PhotoAnalysisRepository extends BaseSupabaseRepository<PhotoAnalysis> implements IPhotoAnalysisRepository {
    constructor(supabase: SupabaseClient);
    findByPhotoUploadId(photoUploadId: string): Promise<PhotoAnalysis[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<PhotoAnalysis[]>;
    findWithPhotoUpload(id: string): Promise<PhotoAnalysis | null>;
    findAllWithPhotoUploads(): Promise<PhotoAnalysis[]>;
}
