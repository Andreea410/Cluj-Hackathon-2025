import { BaseService } from './base.service';
import { UserRoutine } from '../models/user-routine.model';
import { IUserRoutineRepository } from '../repositories/interfaces/user-routine.repository.interface';
export declare class UserRoutineService extends BaseService<UserRoutine> {
    private readonly userRoutineRepository;
    constructor(userRoutineRepository: IUserRoutineRepository);
    assignRoutine(userRoutine: UserRoutine): Promise<UserRoutine>;
    findByUserId(userId: string): Promise<UserRoutine[]>;
    findByRoutineTemplateId(routineTemplateId: string): Promise<UserRoutine[]>;
    findByAuthUserId(authUserId: string): Promise<UserRoutine[]>;
    findByUserAndTemplate(userId: string, routineTemplateId: string): Promise<UserRoutine | null>;
    findWithRelations(id: string): Promise<UserRoutine | null>;
    findAllWithRelations(): Promise<UserRoutine[]>;
    findAllByUserWithDetails(userId: string): Promise<UserRoutine[]>;
    findAllByTemplateWithDetails(routineTemplateId: string): Promise<UserRoutine[]>;
    findAllAssignedBetweenDates(startDate: Date, endDate: Date): Promise<UserRoutine[]>;
    getRoutineStatistics(routineTemplateId: string): Promise<{
        totalAssignments: number;
        assignmentsByDate: {
            date: string;
            count: number;
        }[];
    }>;
    bulkAssignRoutines(userId: string, routineTemplateIds: string[]): Promise<UserRoutine[]>;
    hasUserAssignedRoutine(userId: string, routineTemplateId: string): Promise<boolean>;
    getActiveRoutines(userId: string): Promise<UserRoutine[]>;
    reassignRoutine(id: string, userRoutine: UserRoutine): Promise<UserRoutine>;
}
