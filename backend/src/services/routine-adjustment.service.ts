import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { RoutineAdjustment } from '../models/routine-adjustment.model';
import { IRoutineAdjustmentRepository } from '../repositories/interfaces/routine-adjustment.repository.interface';

@Injectable()
export class RoutineAdjustmentService extends BaseService<RoutineAdjustment> {
  constructor(private readonly routineAdjustmentRepository: IRoutineAdjustmentRepository) {
    super(routineAdjustmentRepository);
  }

  async createRoutineAdjustment(routineAdjustment: RoutineAdjustment): Promise<RoutineAdjustment> {
    // Validate actions format before saving
    this.validateActions(routineAdjustment.actions);
    return this.create(routineAdjustment);
  }

  async findByUserId(userId: string): Promise<RoutineAdjustment[]> {
    return this.routineAdjustmentRepository.findByUserId(userId);
  }

  async findByPhotoAnalysisId(photoAnalysisId: string): Promise<RoutineAdjustment[]> {
    return this.routineAdjustmentRepository.findByPhotoAnalysisId(photoAnalysisId);
  }

  async findByAuthUserId(authUserId: string): Promise<RoutineAdjustment[]> {
    return this.routineAdjustmentRepository.findByAuthUserId(authUserId);
  }

  async findWithRelations(id: string): Promise<RoutineAdjustment | null> {
    return this.routineAdjustmentRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<RoutineAdjustment[]> {
    return this.routineAdjustmentRepository.findAllWithRelations();
  }

  async updateRoutineAdjustment(id: string, routineAdjustment: Partial<RoutineAdjustment>): Promise<RoutineAdjustment> {
    // Don't allow modification of user_id or photo_analysis_id for data integrity
    const { user_id, photo_analysis_id, ...updateData } = routineAdjustment;

    // Validate actions if they are being updated
    if (updateData.actions) {
      this.validateActions(updateData.actions);
    }

    return this.update(id, updateData);
  }

  private validateActions(actions: Record<string, any>): void {
    // Add validation logic for actions format
    // For example, ensure required fields are present or values are within expected ranges
    if (!actions || typeof actions !== 'object') {
      throw new Error('Actions must be a valid JSON object');
    }
    
    // Add more specific validation rules as needed based on your business requirements
  }
} 