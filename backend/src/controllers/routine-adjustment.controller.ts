import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RoutineAdjustmentService } from '../services/routine-adjustment.service';
import { RoutineAdjustment } from '../models/routine-adjustment.model';

@Controller('routine-adjustments')
export class RoutineAdjustmentController {
  constructor(private readonly routineAdjustmentService: RoutineAdjustmentService) {}

  @Post()
  async createRoutineAdjustment(@Body() routineAdjustment: RoutineAdjustment): Promise<RoutineAdjustment> {
    try {
      return await this.routineAdjustmentService.createRoutineAdjustment(routineAdjustment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getRoutineAdjustment(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<RoutineAdjustment> {
    try {
      if (includeRelations) {
        const adjustment = await this.routineAdjustmentService.findWithRelations(id);
        if (!adjustment) throw new Error('Routine adjustment not found');
        return adjustment;
      }
      return await this.routineAdjustmentService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllRoutineAdjustments(
    @Query('userId') userId?: string,
    @Query('photoAnalysisId') photoAnalysisId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<RoutineAdjustment[]> {
    try {
      if (userId) {
        return await this.routineAdjustmentService.findByUserId(userId);
      }
      if (photoAnalysisId) {
        return await this.routineAdjustmentService.findByPhotoAnalysisId(photoAnalysisId);
      }
      if (authUserId) {
        return await this.routineAdjustmentService.findByAuthUserId(authUserId);
      }
      if (includeRelations) {
        return await this.routineAdjustmentService.findAllWithRelations();
      }
      return await this.routineAdjustmentService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateRoutineAdjustment(
    @Param('id') id: string,
    @Body() routineAdjustment: Partial<RoutineAdjustment>
  ): Promise<RoutineAdjustment> {
    try {
      return await this.routineAdjustmentService.updateRoutineAdjustment(id, routineAdjustment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRoutineAdjustment(@Param('id') id: string): Promise<void> {
    try {
      await this.routineAdjustmentService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 