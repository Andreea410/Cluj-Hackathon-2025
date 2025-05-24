import { BaseModel } from './base.model';
import { RoutineStep } from './routine-step.model';
import { Product } from './product.model';

export class RoutineStepProduct extends BaseModel {
  routine_step_id: string;
  product_id: string;
  routineStep?: RoutineStep; // Optional property for when step is included
  product?: Product; // Optional property for when product is included

  constructor(partial: Partial<RoutineStepProduct>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      routine_step_id: this.routine_step_id,
      product_id: this.product_id,
      ...(this.routineStep && { routineStep: this.routineStep.toJSON() }),
      ...(this.product && { product: this.product.toJSON() })
    };
  }

  static fromJSON(json: any): RoutineStepProduct {
    return new RoutineStepProduct({
      id: json.id,
      routine_step_id: json.routine_step_id,
      product_id: json.product_id,
      ...(json.routine_step && { routineStep: RoutineStep.fromJSON(json.routine_step) }),
      ...(json.product && { product: Product.fromJSON(json.product) })
    });
  }
} 