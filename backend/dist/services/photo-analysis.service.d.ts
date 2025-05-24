import { BaseService } from './base.service';
import { PhotoAnalysis } from '../models/photo-analysis.model';
import { IPhotoAnalysisRepository } from '../repositories/interfaces/photo-analysis.repository.interface';
export declare class PhotoAnalysisService extends BaseService<PhotoAnalysis> {
    private readonly photoAnalysisRepository;
    constructor(photoAnalysisRepository: IPhotoAnalysisRepository);
    createPhotoAnalysis(photoAnalysis: PhotoAnalysis): Promise<PhotoAnalysis>;
    findByPhotoUploadId(photoUploadId: string): Promise<PhotoAnalysis[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<PhotoAnalysis[]>;
    findWithPhotoUpload(id: string): Promise<PhotoAnalysis | null>;
    findAllWithPhotoUploads(): Promise<PhotoAnalysis[]>;
    updatePhotoAnalysis(id: string, photoAnalysis: Partial<PhotoAnalysis>): Promise<PhotoAnalysis>;
    analyzeMetrics(metrics: Record<string, any>): Promise<Record<string, any>>;
}
