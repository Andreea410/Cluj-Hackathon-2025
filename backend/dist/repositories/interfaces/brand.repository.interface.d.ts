import { IBaseRepository } from './base.repository.interface';
import { Brand } from '../../models/brand.model';
export interface IBrandRepository extends IBaseRepository<Brand> {
    findByName(name: string): Promise<Brand | null>;
    findByWebsite(website: string): Promise<Brand | null>;
}
