import { BaseModel } from './base.model';
import { RoutineTemplate } from './routine-template.model';

export class RoutineStep extends BaseModel {
  routine_template_id: string;
  step_number: number;
  name: string;
  description: string;
  routineTemplate?: RoutineTemplate; // Optional property for when template is included

  constructor(partial: Partial<RoutineStep>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      routine_template_id: this.routine_template_id,
      step_number: this.step_number,
      name: this.name,
      description: this.description,
      ...(this.routineTemplate && { routineTemplate: this.routineTemplate.toJSON() })
    };
  }

  static fromJSON(json: any): RoutineStep {
    return new RoutineStep({
      id: json.id,
      routine_template_id: json.routine_template_id,
      step_number: json.step_number,
      name: json.name,
      description: json.description,
      ...(json.routine_template && { routineTemplate: RoutineTemplate.fromJSON(json.routine_template) })
    });
  }
} 