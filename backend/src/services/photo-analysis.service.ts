import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { PhotoAnalysis } from '../models/photo-analysis.model';
import { IPhotoAnalysisRepository } from '../repositories/interfaces/photo-analysis.repository.interface';

@Injectable()
export class PhotoAnalysisService extends BaseService<PhotoAnalysis> {
  constructor(private readonly photoAnalysisRepository: IPhotoAnalysisRepository) {
    super(photoAnalysisRepository);
  }

  async createPhotoAnalysis(photoAnalysis: PhotoAnalysis): Promise<PhotoAnalysis> {
    // Set analyzed_at if not provided
    if (!photoAnalysis.analyzed_at) {
      photoAnalysis.analyzed_at = new Date();
    }

    return this.create(photoAnalysis);
  }

  async findByPhotoUploadId(photoUploadId: string): Promise<PhotoAnalysis[]> {
    return this.photoAnalysisRepository.findByPhotoUploadId(photoUploadId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PhotoAnalysis[]> {
    return this.photoAnalysisRepository.findByDateRange(startDate, endDate);
  }

  async findWithPhotoUpload(id: string): Promise<PhotoAnalysis | null> {
    return this.photoAnalysisRepository.findWithPhotoUpload(id);
  }

  async findAllWithPhotoUploads(): Promise<PhotoAnalysis[]> {
    return this.photoAnalysisRepository.findAllWithPhotoUploads();
  }

  async updatePhotoAnalysis(id: string, photoAnalysis: Partial<PhotoAnalysis>): Promise<PhotoAnalysis> {
    // Don't allow modification of photo_upload_id for data integrity
    const { photo_upload_id, ...updateData } = photoAnalysis;
    return this.update(id, updateData);
  }

  async analyzeMetrics(metrics: Record<string, any>): Promise<Record<string, any>> {
    // Here you can add any business logic for analyzing or transforming metrics
    // For now, we'll just return the metrics as is
    return metrics;
  }
} 