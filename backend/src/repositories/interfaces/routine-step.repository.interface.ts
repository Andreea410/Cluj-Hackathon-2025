import { IBaseRepository } from './base.repository.interface';
import { RoutineStep } from '../../models/routine-step.model';

export interface IRoutineStepRepository extends IBaseRepository<RoutineStep> {
  findByRoutineTemplateId(routineTemplateId: string): Promise<RoutineStep[]>;
  findByStepNumber(routineTemplateId: string, stepNumber: number): Promise<RoutineStep | null>;
  findWithTemplate(id: string): Promise<RoutineStep | null>;
  findAllWithTemplate(): Promise<RoutineStep[]>;
  findAllByTemplateWithDetails(routineTemplateId: string): Promise<RoutineStep[]>;
  getMaxStepNumber(routineTemplateId: string): Promise<number>;
  reorderSteps(routineTemplateId: string, stepNumber: number): Promise<void>;
} 