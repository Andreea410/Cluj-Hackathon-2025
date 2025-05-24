import { BaseModel } from '../models/base.model';
import { IBaseRepository } from '../repositories/interfaces/base.repository.interface';
export declare abstract class BaseService<T extends BaseModel> {
    protected readonly repository: IBaseRepository<T>;
    protected constructor(repository: IBaseRepository<T>);
    create(entity: T): Promise<T>;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
    update(id: string, entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}
