import { BaseService } from './base.service';
import { RoutineAdjustment } from '../models/routine-adjustment.model';
import { IRoutineAdjustmentRepository } from '../repositories/interfaces/routine-adjustment.repository.interface';
export declare class RoutineAdjustmentService extends BaseService<RoutineAdjustment> {
    private readonly routineAdjustmentRepository;
    constructor(routineAdjustmentRepository: IRoutineAdjustmentRepository);
    createRoutineAdjustment(routineAdjustment: RoutineAdjustment): Promise<RoutineAdjustment>;
    findByUserId(userId: string): Promise<RoutineAdjustment[]>;
    findByPhotoAnalysisId(photoAnalysisId: string): Promise<RoutineAdjustment[]>;
    findByAuthUserId(authUserId: string): Promise<RoutineAdjustment[]>;
    findWithRelations(id: string): Promise<RoutineAdjustment | null>;
    findAllWithRelations(): Promise<RoutineAdjustment[]>;
    updateRoutineAdjustment(id: string, routineAdjustment: Partial<RoutineAdjustment>): Promise<RoutineAdjustment>;
    private validateActions;
}
