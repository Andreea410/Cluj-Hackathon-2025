import { UserRoutineService } from '../services/user-routine.service';
import { UserRoutine } from '../models/user-routine.model';
export declare class UserRoutineController {
    private readonly userRoutineService;
    constructor(userRoutineService: UserRoutineService);
    assignRoutine(userRoutine: UserRoutine): Promise<UserRoutine>;
    bulkAssignRoutines(userId: string, data: {
        routineTemplateIds: string[];
    }): Promise<UserRoutine[]>;
    getUserRoutine(id: string, includeRelations?: boolean): Promise<UserRoutine>;
    getAllUserRoutines(userId?: string, routineTemplateId?: string, authUserId?: string, includeRelations?: boolean, startDate?: string, endDate?: string): Promise<UserRoutine[]>;
    getRoutineStatistics(routineTemplateId: string): Promise<{
        totalAssignments: number;
        assignmentsByDate: {
            date: string;
            count: number;
        }[];
    }>;
    checkRoutineAssigned(userId: string, routineTemplateId: string): Promise<{
        assigned: boolean;
    }>;
    getActiveRoutines(userId: string): Promise<UserRoutine[]>;
    reassignRoutine(id: string, userRoutine: UserRoutine): Promise<UserRoutine>;
    deleteUserRoutine(id: string): Promise<void>;
}
