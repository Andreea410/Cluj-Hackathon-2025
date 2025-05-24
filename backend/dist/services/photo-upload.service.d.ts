import { BaseService } from './base.service';
import { PhotoUpload } from '../models/photo-upload.model';
import { IPhotoUploadRepository } from '../repositories/interfaces/photo-upload.repository.interface';
export declare class PhotoUploadService extends BaseService<PhotoUpload> {
    private readonly photoUploadRepository;
    constructor(photoUploadRepository: IPhotoUploadRepository);
    createPhotoUpload(photoUpload: PhotoUpload): Promise<PhotoUpload>;
    findByUserId(userId: string): Promise<PhotoUpload[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<PhotoUpload[]>;
    findWithUser(id: string): Promise<PhotoUpload | null>;
    findAllWithUsers(): Promise<PhotoUpload[]>;
    findByAuthUserId(authUserId: string): Promise<PhotoUpload[]>;
    updatePhotoUpload(id: string, photoUpload: Partial<PhotoUpload>): Promise<PhotoUpload>;
}
