import { IBaseRepository } from './base.repository.interface';
import { PhotoUpload } from '../../models/photo-upload.model';

export interface IPhotoUploadRepository extends IBaseRepository<PhotoUpload> {
  findByUserId(userId: string): Promise<PhotoUpload[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<PhotoUpload[]>;
  findWithUser(id: string): Promise<PhotoUpload | null>;
  findAllWithUsers(): Promise<PhotoUpload[]>;
  findByAuthUserId(authUserId: string): Promise<PhotoUpload[]>;
}
 