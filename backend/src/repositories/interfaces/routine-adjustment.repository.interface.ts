import { IBaseRepository } from './base.repository.interface';
import { RoutineAdjustment } from '../../models/routine-adjustment.model';

export interface IRoutineAdjustmentRepository extends IBaseRepository<RoutineAdjustment> {
  findByUserId(userId: string): Promise<RoutineAdjustment[]>;
  findByPhotoAnalysisId(photoAnalysisId: string): Promise<RoutineAdjustment[]>;
  findByAuthUserId(authUserId: string): Promise<RoutineAdjustment[]>;
  findWithRelations(id: string): Promise<RoutineAdjustment | null>;
  findAllWithRelations(): Promise<RoutineAdjustment[]>;
} 