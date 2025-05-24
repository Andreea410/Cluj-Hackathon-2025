import { BaseService } from './base.service';
import { RoutineTemplate } from '../models/routine-template.model';
import { IRoutineTemplateRepository } from '../repositories/interfaces/routine-template.repository.interface';
export declare class RoutineTemplateService extends BaseService<RoutineTemplate> {
    private readonly routineTemplateRepository;
    constructor(routineTemplateRepository: IRoutineTemplateRepository);
    createTemplate(template: RoutineTemplate): Promise<RoutineTemplate>;
    updateTemplate(id: string, template: Partial<RoutineTemplate>): Promise<RoutineTemplate>;
    searchTemplates(query?: string): Promise<RoutineTemplate[]>;
    findByName(name: string): Promise<RoutineTemplate[]>;
}
