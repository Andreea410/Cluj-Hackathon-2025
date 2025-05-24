import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Brand } from '../models/brand.model';
import { IBrandRepository } from '../repositories/interfaces/brand.repository.interface';

@Injectable()
export class BrandService extends BaseService<Brand> {
  constructor(private readonly brandRepository: IBrandRepository) {
    super(brandRepository);
  }

  async createBrand(brand: Brand): Promise<Brand> {
    const existingBrand = await this.brandRepository.findByName(brand.name);
    if (existingBrand) {
      throw new Error('A brand with this name already exists');
    }

    if (brand.website) {
      const existingWebsite = await this.brandRepository.findByWebsite(brand.website);
      if (existingWebsite) {
        throw new Error('A brand with this website already exists');
      }
    }

    return this.create(brand);
  }

  async updateBrand(id: string, brand: Partial<Brand>): Promise<Brand> {
    if (brand.name) {
      const existingBrand = await this.brandRepository.findByName(brand.name);
      if (existingBrand && existingBrand.id !== id) {
        throw new Error('A brand with this name already exists');
      }
    }

    if (brand.website) {
      const existingWebsite = await this.brandRepository.findByWebsite(brand.website);
      if (existingWebsite && existingWebsite.id !== id) {
        throw new Error('A brand with this website already exists');
      }
    }

    return this.update(id, brand);
  }
} 