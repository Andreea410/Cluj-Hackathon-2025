import { RoutineTemplateService } from '../services/routine-template.service';
import { RoutineTemplate } from '../models/routine-template.model';
export declare class RoutineTemplateController {
    private readonly routineTemplateService;
    constructor(routineTemplateService: RoutineTemplateService);
    createTemplate(template: RoutineTemplate): Promise<RoutineTemplate>;
    getTemplates(search?: string): Promise<RoutineTemplate[]>;
    getTemplatesByName(name: string): Promise<RoutineTemplate[]>;
    getTemplate(id: string): Promise<RoutineTemplate>;
    updateTemplate(id: string, template: Partial<RoutineTemplate>): Promise<RoutineTemplate>;
    deleteTemplate(id: string): Promise<void>;
}
