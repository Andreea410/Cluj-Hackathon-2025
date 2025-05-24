import { RoutineAdjustmentService } from '../services/routine-adjustment.service';
import { RoutineAdjustment } from '../models/routine-adjustment.model';
export declare class RoutineAdjustmentController {
    private readonly routineAdjustmentService;
    constructor(routineAdjustmentService: RoutineAdjustmentService);
    createRoutineAdjustment(routineAdjustment: RoutineAdjustment): Promise<RoutineAdjustment>;
    getRoutineAdjustment(id: string, includeRelations?: boolean): Promise<RoutineAdjustment>;
    getAllRoutineAdjustments(userId?: string, photoAnalysisId?: string, authUserId?: string, includeRelations?: boolean): Promise<RoutineAdjustment[]>;
    updateRoutineAdjustment(id: string, routineAdjustment: Partial<RoutineAdjustment>): Promise<RoutineAdjustment>;
    deleteRoutineAdjustment(id: string): Promise<void>;
}
