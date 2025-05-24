import { PhotoUploadService } from '../services/photo-upload.service';
import { PhotoUpload } from '../models/photo-upload.model';
export declare class PhotoUploadController {
    private readonly photoUploadService;
    constructor(photoUploadService: PhotoUploadService);
    createPhotoUpload(photoUpload: PhotoUpload): Promise<PhotoUpload>;
    getPhotoUpload(id: string, includeUser?: boolean): Promise<PhotoUpload>;
    getAllPhotoUploads(userId?: string, authUserId?: string, startDate?: string, endDate?: string, includeUsers?: boolean): Promise<PhotoUpload[]>;
    updatePhotoUpload(id: string, photoUpload: Partial<PhotoUpload>): Promise<PhotoUpload>;
    deletePhotoUpload(id: string): Promise<void>;
}
