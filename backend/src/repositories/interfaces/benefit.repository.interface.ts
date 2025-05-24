import { IBaseRepository } from './base.repository.interface';
import { Benefit } from '../../models/benefit.model';

export interface IBenefitRepository extends IBaseRepository<Benefit> {
  findByName(name: string): Promise<Benefit | null>;
} 