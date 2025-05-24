import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserRoutine } from '../models/user-routine.model';
import { IUserRoutineRepository } from '../repositories/interfaces/user-routine.repository.interface';

@Injectable()
export class UserRoutineService extends BaseService<UserRoutine> {
  constructor(private readonly userRoutineRepository: IUserRoutineRepository) {
    super(userRoutineRepository);
  }

  async assignRoutine(userRoutine: UserRoutine): Promise<UserRoutine> {
    // Check if user already has this routine template assigned
    const existing = await this.userRoutineRepository.findByUserAndTemplate(
      userRoutine.user_id,
      userRoutine.routine_template_id
    );

    if (existing) {
      throw new Error('User already has this routine template assigned');
    }

    // Set assigned_at timestamp
    userRoutine.assigned_at = new Date();
    return this.create(userRoutine);
  }

  async findByUserId(userId: string): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findByUserId(userId);
  }

  async findByRoutineTemplateId(routineTemplateId: string): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findByRoutineTemplateId(routineTemplateId);
  }

  async findByAuthUserId(authUserId: string): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findByAuthUserId(authUserId);
  }

  async findByUserAndTemplate(userId: string, routineTemplateId: string): Promise<UserRoutine | null> {
    return this.userRoutineRepository.findByUserAndTemplate(userId, routineTemplateId);
  }

  async findWithRelations(id: string): Promise<UserRoutine | null> {
    return this.userRoutineRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findAllWithRelations();
  }

  async findAllByUserWithDetails(userId: string): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findAllByUserWithDetails(userId);
  }

  async findAllByTemplateWithDetails(routineTemplateId: string): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findAllByTemplateWithDetails(routineTemplateId);
  }

  async findAllAssignedBetweenDates(startDate: Date, endDate: Date): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findAllAssignedBetweenDates(startDate, endDate);
  }

  async getRoutineStatistics(routineTemplateId: string): Promise<{
    totalAssignments: number;
    assignmentsByDate: { date: string; count: number }[];
  }> {
    const assignments = await this.findByRoutineTemplateId(routineTemplateId);
    const totalAssignments = assignments.length;

    // Group assignments by date
    const assignmentsByDate = assignments.reduce((acc, assignment) => {
      const date = assignment.assigned_at.toISOString().split('T')[0];
      const existingEntry = acc.find(entry => entry.date === date);
      
      if (existingEntry) {
        existingEntry.count++;
      } else {
        acc.push({ date, count: 1 });
      }
      
      return acc;
    }, [] as { date: string; count: number }[]);

    // Sort by date
    assignmentsByDate.sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalAssignments,
      assignmentsByDate
    };
  }

  async bulkAssignRoutines(
    userId: string,
    routineTemplateIds: string[]
  ): Promise<UserRoutine[]> {
    const results: UserRoutine[] = [];

    for (const templateId of routineTemplateIds) {
      try {
        const userRoutine = await this.assignRoutine(new UserRoutine({
          user_id: userId,
          routine_template_id: templateId,
          assigned_at: new Date()
        }));
        results.push(userRoutine);
      } catch (error) {
        // Skip if routine already assigned
        if (!error.message.includes('already has this routine')) {
          throw error;
        }
      }
    }

    return results;
  }

  async hasUserAssignedRoutine(userId: string, routineTemplateId: string): Promise<boolean> {
    const assigned = await this.findByUserAndTemplate(userId, routineTemplateId);
    return !!assigned;
  }

  async getActiveRoutines(userId: string): Promise<UserRoutine[]> {
    return this.userRoutineRepository.findActiveRoutines(userId);
  }

  async reassignRoutine(id: string, userRoutine: UserRoutine): Promise<UserRoutine> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('User routine not found');
    }

    // If changing template or user, check for existing assignment
    if (
      (userRoutine.user_id !== existing.user_id || 
       userRoutine.routine_template_id !== existing.routine_template_id) &&
      await this.findByUserAndTemplate(userRoutine.user_id, userRoutine.routine_template_id)
    ) {
      throw new Error('User already has this routine template assigned');
    }

    // Update assigned_at if template changes
    if (userRoutine.routine_template_id !== existing.routine_template_id) {
      userRoutine.assigned_at = new Date();
    }

    return this.update(id, userRoutine);
  }
} 