import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPhotoUploadRepository } from './interfaces/photo-upload.repository.interface';
import { PhotoUpload } from '../models/photo-upload.model';
export declare class PhotoUploadRepository extends BaseSupabaseRepository<PhotoUpload> implements IPhotoUploadRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<PhotoUpload[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<PhotoUpload[]>;
    findWithUser(id: string): Promise<PhotoUpload | null>;
    findAllWithUsers(): Promise<PhotoUpload[]>;
    findByAuthUserId(authUserId: string): Promise<PhotoUpload[]>;
}
