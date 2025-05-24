import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { RoutineStep } from '../models/routine-step.model';
import { IRoutineStepRepository } from '../repositories/interfaces/routine-step.repository.interface';

@Injectable()
export class RoutineStepService extends BaseService<RoutineStep> {
  constructor(private readonly routineStepRepository: IRoutineStepRepository) {
    super(routineStepRepository);
  }

  async createRoutineStep(routineStep: RoutineStep): Promise<RoutineStep> {
    // Validate step number
    if (!Number.isInteger(routineStep.step_number) || routineStep.step_number < 1) {
      throw new Error('Step number must be a positive integer');
    }

    // Check for duplicate step number in the same template
    const existing = await this.routineStepRepository.findByStepNumber(
      routineStep.routine_template_id,
      routineStep.step_number
    );
    
    if (existing) {
      throw new Error('A step with this number already exists in this template');
    }

    return this.create(routineStep);
  }

  async findByRoutineTemplateId(routineTemplateId: string): Promise<RoutineStep[]> {
    return this.routineStepRepository.findByRoutineTemplateId(routineTemplateId);
  }

  async findByStepNumber(routineTemplateId: string, stepNumber: number): Promise<RoutineStep | null> {
    if (!Number.isInteger(stepNumber) || stepNumber < 1) {
      throw new Error('Step number must be a positive integer');
    }
    return this.routineStepRepository.findByStepNumber(routineTemplateId, stepNumber);
  }

  async findWithTemplate(id: string): Promise<RoutineStep | null> {
    return this.routineStepRepository.findWithTemplate(id);
  }

  async findAllWithTemplate(): Promise<RoutineStep[]> {
    return this.routineStepRepository.findAllWithTemplate();
  }

  async findAllByTemplateWithDetails(routineTemplateId: string): Promise<RoutineStep[]> {
    return this.routineStepRepository.findAllByTemplateWithDetails(routineTemplateId);
  }

  async updateRoutineStep(id: string, routineStep: Partial<RoutineStep>): Promise<RoutineStep> {
    const current = await this.findById(id);
    if (!current) {
      throw new Error('Routine step not found');
    }

    // Validate step number if being updated
    if (routineStep.step_number !== undefined) {
      if (!Number.isInteger(routineStep.step_number) || routineStep.step_number < 1) {
        throw new Error('Step number must be a positive integer');
      }

      // Check for duplicate step number if changing template or step number
      const templateId = routineStep.routine_template_id || current.routine_template_id;
      const existing = await this.routineStepRepository.findByStepNumber(
        templateId,
        routineStep.step_number
      );

      if (existing && existing.id !== id) {
        throw new Error('A step with this number already exists in this template');
      }

      // Reorder steps if necessary
      if (routineStep.step_number !== current.step_number) {
        await this.routineStepRepository.reorderSteps(templateId, current.step_number);
      }
    }

    return this.update(id, routineStep);
  }

  async bulkCreateRoutineSteps(
    routineTemplateId: string,
    steps: Array<Omit<RoutineStep, 'id' | 'routine_template_id'>>
  ): Promise<RoutineStep[]> {
    const results: RoutineStep[] = [];
    let maxStepNumber = await this.routineStepRepository.getMaxStepNumber(routineTemplateId);

    // Process all steps
    for (const step of steps) {
      maxStepNumber++;
      const created = await this.createRoutineStep(new RoutineStep({
        ...step,
        routine_template_id: routineTemplateId,
        step_number: maxStepNumber
      }));
      results.push(created);
    }

    return results;
  }

  async deleteRoutineStep(id: string): Promise<void> {
    const step = await this.findById(id);
    if (!step) {
      throw new Error('Routine step not found');
    }

    await this.delete(id);
    await this.routineStepRepository.reorderSteps(step.routine_template_id, step.step_number);
  }
} 