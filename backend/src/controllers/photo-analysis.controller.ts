import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PhotoAnalysisService } from '../services/photo-analysis.service';
import { PhotoAnalysis } from '../models/photo-analysis.model';

@Controller('photo-analyses')
export class PhotoAnalysisController {
  constructor(private readonly photoAnalysisService: PhotoAnalysisService) {}

  @Post()
  async createPhotoAnalysis(@Body() photoAnalysis: PhotoAnalysis): Promise<PhotoAnalysis> {
    try {
      // Analyze metrics before saving
      photoAnalysis.metrics = await this.photoAnalysisService.analyzeMetrics(photoAnalysis.metrics);
      return await this.photoAnalysisService.createPhotoAnalysis(photoAnalysis);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getPhotoAnalysis(
    @Param('id') id: string,
    @Query('includePhotoUpload') includePhotoUpload?: boolean
  ): Promise<PhotoAnalysis> {
    try {
      if (includePhotoUpload) {
        const analysis = await this.photoAnalysisService.findWithPhotoUpload(id);
        if (!analysis) throw new Error('Photo analysis not found');
        return analysis;
      }
      return await this.photoAnalysisService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllPhotoAnalyses(
    @Query('photoUploadId') photoUploadId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('includePhotoUploads') includePhotoUploads?: boolean
  ): Promise<PhotoAnalysis[]> {
    try {
      if (photoUploadId) {
        return await this.photoAnalysisService.findByPhotoUploadId(photoUploadId);
      }
      if (startDate && endDate) {
        return await this.photoAnalysisService.findByDateRange(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (includePhotoUploads) {
        return await this.photoAnalysisService.findAllWithPhotoUploads();
      }
      return await this.photoAnalysisService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updatePhotoAnalysis(
    @Param('id') id: string,
    @Body() photoAnalysis: Partial<PhotoAnalysis>
  ): Promise<PhotoAnalysis> {
    try {
      // If metrics are being updated, analyze them first
      if (photoAnalysis.metrics) {
        photoAnalysis.metrics = await this.photoAnalysisService.analyzeMetrics(photoAnalysis.metrics);
      }
      return await this.photoAnalysisService.updatePhotoAnalysis(id, photoAnalysis);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePhotoAnalysis(@Param('id') id: string): Promise<void> {
    try {
      await this.photoAnalysisService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 