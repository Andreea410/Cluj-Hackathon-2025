import { BaseModel } from '../models/base.model';
import { IBaseRepository } from '../repositories/interfaces/base.repository.interface';

export abstract class BaseService<T extends BaseModel> {
  protected constructor(protected readonly repository: IBaseRepository<T>) {}

  async create(entity: T): Promise<T> {
    return this.repository.create(entity);
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    const existingEntity = await this.repository.findById(id);
    if (!existingEntity) {
      throw new Error('Entity not found');
    }
    return this.repository.update(id, entity);
  }

  async delete(id: string): Promise<void> {
    const existingEntity = await this.repository.findById(id);
    if (!existingEntity) {
      throw new Error('Entity not found');
    }
    await this.repository.delete(id);
  }
} 