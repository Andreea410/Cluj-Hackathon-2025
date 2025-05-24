import { RoutineStepProductService } from '../services/routine-step-product.service';
import { RoutineStepProduct } from '../models/routine-step-product.model';
export declare class RoutineStepProductController {
    private readonly routineStepProductService;
    constructor(routineStepProductService: RoutineStepProductService);
    createRoutineStepProduct(routineStepProduct: RoutineStepProduct): Promise<RoutineStepProduct>;
    bulkCreateRoutineStepProducts(stepId: string, data: {
        productIds: string[];
    }): Promise<RoutineStepProduct[]>;
    getRoutineStepProduct(id: string, includeRelations?: boolean): Promise<RoutineStepProduct>;
    getAllRoutineStepProducts(stepId?: string, productId?: string, includeRelations?: boolean): Promise<RoutineStepProduct[]>;
    bulkDeleteRoutineStepProducts(stepId: string, data: {
        productIds: string[];
    }): Promise<void>;
    deleteRoutineStepProduct(id: string): Promise<void>;
}
