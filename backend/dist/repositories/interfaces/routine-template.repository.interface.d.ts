import { IBaseRepository } from './base.repository.interface';
import { RoutineTemplate } from '../../models/routine-template.model';
export interface IRoutineTemplateRepository extends IBaseRepository<RoutineTemplate> {
    findByName(name: string): Promise<RoutineTemplate[]>;
    findByNameExact(name: string): Promise<RoutineTemplate | null>;
    searchTemplates(query: string): Promise<RoutineTemplate[]>;
}
