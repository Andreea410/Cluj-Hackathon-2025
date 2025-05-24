import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PhotoUploadService } from '../services/photo-upload.service';
import { PhotoUpload } from '../models/photo-upload.model';

@Controller('photo-uploads')
export class PhotoUploadController {
  constructor(private readonly photoUploadService: PhotoUploadService) {}

  @Post()
  async createPhotoUpload(@Body() photoUpload: PhotoUpload): Promise<PhotoUpload> {
    try {
      return await this.photoUploadService.createPhotoUpload(photoUpload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getPhotoUpload(
    @Param('id') id: string,
    @Query('includeUser') includeUser?: boolean
  ): Promise<PhotoUpload> {
    try {
      if (includeUser) {
        const photoUpload = await this.photoUploadService.findWithUser(id);
        if (!photoUpload) throw new Error('Photo upload not found');
        return photoUpload;
      }
      return await this.photoUploadService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllPhotoUploads(
    @Query('userId') userId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('includeUsers') includeUsers?: boolean
  ): Promise<PhotoUpload[]> {
    try {
      if (userId) {
        return await this.photoUploadService.findByUserId(userId);
      }
      if (authUserId) {
        return await this.photoUploadService.findByAuthUserId(authUserId);
      }
      if (startDate && endDate) {
        return await this.photoUploadService.findByDateRange(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (includeUsers) {
        return await this.photoUploadService.findAllWithUsers();
      }
      return await this.photoUploadService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updatePhotoUpload(
    @Param('id') id: string,
    @Body() photoUpload: Partial<PhotoUpload>
  ): Promise<PhotoUpload> {
    try {
      return await this.photoUploadService.updatePhotoUpload(id, photoUpload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePhotoUpload(@Param('id') id: string): Promise<void> {
    try {
      await this.photoUploadService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 