import { IBaseRepository } from './base.repository.interface';
import { Product } from '../../models/product.model';
import { Brand } from '../../models/brand.model';

export interface IProductRepository extends IBaseRepository<Product> {
  findByName(name: string): Promise<Product | null>;
  findByBrandId(brandId: string): Promise<Product[]>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;
  findInStock(): Promise<Product[]>;
  findOutOfStock(): Promise<Product[]>;
  findWithBrand(id: string): Promise<{ product: Product; brand: Brand } | null>;
  searchProducts(query: string): Promise<Product[]>;
} 