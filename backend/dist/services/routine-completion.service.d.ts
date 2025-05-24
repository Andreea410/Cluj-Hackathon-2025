import { RoutineCompletionRepository } from '../repositories/routine-completion.repository';
import { PointTransactionRepository } from '../repositories/point-transaction.repository';
import { RoutineCompletion } from '../models/routine-completion.model';
export declare class RoutineCompletionService {
    private routineCompletionRepo;
    private pointTransactionRepo;
    constructor(routineCompletionRepo: RoutineCompletionRepository, pointTransactionRepo: PointTransactionRepository);
    completeRoutineStep(userId: string, isMorning: boolean, completed: boolean): Promise<RoutineCompletion>;
    private awardPoints;
    getCompletionHistory(userId: string): Promise<RoutineCompletion[]>;
}
