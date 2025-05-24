import { Request, Response } from 'express';
import { RoutineCompletionService } from '../services/routine-completion.service';
export declare class RoutineCompletionController {
    private routineCompletionService;
    constructor(routineCompletionService: RoutineCompletionService);
    completeRoutineStep(req: Request, res: Response): Promise<void>;
    getCompletionHistory(req: Request, res: Response): Promise<void>;
}
