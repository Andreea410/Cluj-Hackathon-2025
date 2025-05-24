import { BaseModel } from './base.model';
import { RoutineTemplate } from './routine-template.model';
export declare class RoutineStep extends BaseModel {
    routine_template_id: string;
    step_number: number;
    name: string;
    description: string;
    routineTemplate?: RoutineTemplate;
    constructor(partial: Partial<RoutineStep>);
    toJSON(): {
        routineTemplate: Record<string, any>;
        routine_template_id: string;
        step_number: number;
        name: string;
        description: string;
    };
    static fromJSON(json: any): RoutineStep;
}
