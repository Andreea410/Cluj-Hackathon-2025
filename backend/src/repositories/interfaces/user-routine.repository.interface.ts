import { IBaseRepository } from './base.repository.interface';
import { UserRoutine } from '../../models/user-routine.model';

export interface IUserRoutineRepository extends IBaseRepository<UserRoutine> {
  findByUserId(userId: string): Promise<UserRoutine[]>;
  findByRoutineTemplateId(routineTemplateId: string): Promise<UserRoutine[]>;
  findByAuthUserId(authUserId: string): Promise<UserRoutine[]>;
  findByUserAndTemplate(userId: string, routineTemplateId: string): Promise<UserRoutine | null>;
  findWithRelations(id: string): Promise<UserRoutine | null>;
  findAllWithRelations(): Promise<UserRoutine[]>;
  findAllByUserWithDetails(userId: string): Promise<UserRoutine[]>;
  findAllByTemplateWithDetails(routineTemplateId: string): Promise<UserRoutine[]>;
  findAllAssignedBetweenDates(startDate: Date, endDate: Date): Promise<UserRoutine[]>;
  countUsersByTemplate(routineTemplateId: string): Promise<number>;
  findActiveRoutines(userId: string): Promise<UserRoutine[]>;
} 