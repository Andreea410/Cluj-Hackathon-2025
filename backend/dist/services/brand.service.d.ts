import { BaseService } from './base.service';
import { Brand } from '../models/brand.model';
import { IBrandRepository } from '../repositories/interfaces/brand.repository.interface';
export declare class BrandService extends BaseService<Brand> {
    private readonly brandRepository;
    constructor(brandRepository: IBrandRepository);
    createBrand(brand: Brand): Promise<Brand>;
    updateBrand(id: string, brand: Partial<Brand>): Promise<Brand>;
}
