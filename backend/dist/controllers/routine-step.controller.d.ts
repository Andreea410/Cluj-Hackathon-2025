import { RoutineStepService } from '../services/routine-step.service';
import { RoutineStep } from '../models/routine-step.model';
export declare class RoutineStepController {
    private readonly routineStepService;
    constructor(routineStepService: RoutineStepService);
    createRoutineStep(routineStep: RoutineStep): Promise<RoutineStep>;
    bulkCreateRoutineSteps(templateId: string, data: {
        steps: Array<Omit<RoutineStep, 'id' | 'routine_template_id'>>;
    }): Promise<RoutineStep[]>;
    getRoutineStep(id: string, includeTemplate?: boolean): Promise<RoutineStep>;
    getAllRoutineSteps(templateId?: string, stepNumber?: number, includeTemplate?: boolean): Promise<RoutineStep[]>;
    updateRoutineStep(id: string, routineStep: Partial<RoutineStep>): Promise<RoutineStep>;
    deleteRoutineStep(id: string): Promise<void>;
}
