import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { PhotoUpload } from '../models/photo-upload.model';
import { IPhotoUploadRepository } from '../repositories/interfaces/photo-upload.repository.interface';

@Injectable()
export class PhotoUploadService extends BaseService<PhotoUpload> {
  constructor(private readonly photoUploadRepository: IPhotoUploadRepository) {
    super(photoUploadRepository);
  }

  async createPhotoUpload(photoUpload: PhotoUpload): Promise<PhotoUpload> {
    // Set upload_date and created_at if not provided
    if (!photoUpload.upload_date) {
      photoUpload.upload_date = new Date();
    }
    if (!photoUpload.created_at) {
      photoUpload.created_at = new Date();
    }

    return this.create(photoUpload);
  }

  async findByUserId(userId: string): Promise<PhotoUpload[]> {
    return this.photoUploadRepository.findByUserId(userId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PhotoUpload[]> {
    return this.photoUploadRepository.findByDateRange(startDate, endDate);
  }

  async findWithUser(id: string): Promise<PhotoUpload | null> {
    return this.photoUploadRepository.findWithUser(id);
  }

  async findAllWithUsers(): Promise<PhotoUpload[]> {
    return this.photoUploadRepository.findAllWithUsers();
  }

  async findByAuthUserId(authUserId: string): Promise<PhotoUpload[]> {
    return this.photoUploadRepository.findByAuthUserId(authUserId);
  }

  async updatePhotoUpload(id: string, photoUpload: Partial<PhotoUpload>): Promise<PhotoUpload> {
    // Don't allow modification of user_id or auth_user_id for security
    const { user_id, auth_user_id, ...updateData } = photoUpload;
    return this.update(id, updateData);
  }
} 