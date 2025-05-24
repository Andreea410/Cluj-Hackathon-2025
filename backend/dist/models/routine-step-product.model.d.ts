import { BaseModel } from './base.model';
import { RoutineStep } from './routine-step.model';
import { Product } from './product.model';
export declare class RoutineStepProduct extends BaseModel {
    routine_step_id: string;
    product_id: string;
    routineStep?: RoutineStep;
    product?: Product;
    constructor(partial: Partial<RoutineStepProduct>);
    toJSON(): {
        product: Record<string, any>;
        routineStep: {
            routineTemplate: Record<string, any>;
            routine_template_id: string;
            step_number: number;
            name: string;
            description: string;
        };
        routine_step_id: string;
        product_id: string;
    };
    static fromJSON(json: any): RoutineStepProduct;
}
