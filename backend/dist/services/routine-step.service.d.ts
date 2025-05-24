import { BaseService } from './base.service';
import { RoutineStep } from '../models/routine-step.model';
import { IRoutineStepRepository } from '../repositories/interfaces/routine-step.repository.interface';
export declare class RoutineStepService extends BaseService<RoutineStep> {
    private readonly routineStepRepository;
    constructor(routineStepRepository: IRoutineStepRepository);
    createRoutineStep(routineStep: RoutineStep): Promise<RoutineStep>;
    findByRoutineTemplateId(routineTemplateId: string): Promise<RoutineStep[]>;
    findByStepNumber(routineTemplateId: string, stepNumber: number): Promise<RoutineStep | null>;
    findWithTemplate(id: string): Promise<RoutineStep | null>;
    findAllWithTemplate(): Promise<RoutineStep[]>;
    findAllByTemplateWithDetails(routineTemplateId: string): Promise<RoutineStep[]>;
    updateRoutineStep(id: string, routineStep: Partial<RoutineStep>): Promise<RoutineStep>;
    bulkCreateRoutineSteps(routineTemplateId: string, steps: Array<Omit<RoutineStep, 'id' | 'routine_template_id'>>): Promise<RoutineStep[]>;
    deleteRoutineStep(id: string): Promise<void>;
}
