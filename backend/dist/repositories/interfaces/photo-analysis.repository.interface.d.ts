import { IBaseRepository } from './base.repository.interface';
import { PhotoAnalysis } from '../../models/photo-analysis.model';
export interface IPhotoAnalysisRepository extends IBaseRepository<PhotoAnalysis> {
    findByPhotoUploadId(photoUploadId: string): Promise<PhotoAnalysis[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<PhotoAnalysis[]>;
    findWithPhotoUpload(id: string): Promise<PhotoAnalysis | null>;
    findAllWithPhotoUploads(): Promise<PhotoAnalysis[]>;
}
