import { BaseModel } from '../../models/base.model';
export interface IBaseRepository<T extends BaseModel> {
    create(entity: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string, entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}
