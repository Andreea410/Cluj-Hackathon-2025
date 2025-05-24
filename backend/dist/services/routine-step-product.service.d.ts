import { BaseService } from './base.service';
import { RoutineStepProduct } from '../models/routine-step-product.model';
import { IRoutineStepProductRepository } from '../repositories/interfaces/routine-step-product.repository.interface';
export declare class RoutineStepProductService extends BaseService<RoutineStepProduct> {
    private readonly routineStepProductRepository;
    constructor(routineStepProductRepository: IRoutineStepProductRepository);
    createRoutineStepProduct(routineStepProduct: RoutineStepProduct): Promise<RoutineStepProduct>;
    findByRoutineStepId(routineStepId: string): Promise<RoutineStepProduct[]>;
    findByProductId(productId: string): Promise<RoutineStepProduct[]>;
    findByRoutineStepAndProduct(routineStepId: string, productId: string): Promise<RoutineStepProduct | null>;
    findWithRelations(id: string): Promise<RoutineStepProduct | null>;
    findAllWithRelations(): Promise<RoutineStepProduct[]>;
    findAllByStepWithProducts(routineStepId: string): Promise<RoutineStepProduct[]>;
    findAllByProductWithSteps(productId: string): Promise<RoutineStepProduct[]>;
    bulkCreateRoutineStepProducts(routineStepId: string, productIds: string[]): Promise<RoutineStepProduct[]>;
    bulkDeleteRoutineStepProducts(routineStepId: string, productIds: string[]): Promise<void>;
}
