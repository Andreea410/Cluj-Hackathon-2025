import { PhotoAnalysisService } from '../services/photo-analysis.service';
import { PhotoAnalysis } from '../models/photo-analysis.model';
export declare class PhotoAnalysisController {
    private readonly photoAnalysisService;
    constructor(photoAnalysisService: PhotoAnalysisService);
    createPhotoAnalysis(photoAnalysis: PhotoAnalysis): Promise<PhotoAnalysis>;
    getPhotoAnalysis(id: string, includePhotoUpload?: boolean): Promise<PhotoAnalysis>;
    getAllPhotoAnalyses(photoUploadId?: string, startDate?: string, endDate?: string, includePhotoUploads?: boolean): Promise<PhotoAnalysis[]>;
    updatePhotoAnalysis(id: string, photoAnalysis: Partial<PhotoAnalysis>): Promise<PhotoAnalysis>;
    deletePhotoAnalysis(id: string): Promise<void>;
}
