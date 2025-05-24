import { IBaseRepository } from './base.repository.interface';
import { RoutineStepProduct } from '../../models/routine-step-product.model';
export interface IRoutineStepProductRepository extends IBaseRepository<RoutineStepProduct> {
    findByRoutineStepId(routineStepId: string): Promise<RoutineStepProduct[]>;
    findByProductId(productId: string): Promise<RoutineStepProduct[]>;
    findByRoutineStepAndProduct(routineStepId: string, productId: string): Promise<RoutineStepProduct | null>;
    findWithRelations(id: string): Promise<RoutineStepProduct | null>;
    findAllWithRelations(): Promise<RoutineStepProduct[]>;
    findAllByStepWithProducts(routineStepId: string): Promise<RoutineStepProduct[]>;
    findAllByProductWithSteps(productId: string): Promise<RoutineStepProduct[]>;
}
