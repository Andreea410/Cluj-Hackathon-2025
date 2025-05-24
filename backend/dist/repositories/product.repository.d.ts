import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IProductRepository } from './interfaces/product.repository.interface';
import { Product } from '../models/product.model';
import { Brand } from '../models/brand.model';
export declare class ProductRepository extends BaseSupabaseRepository<Product> implements IProductRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<Product | null>;
    findByBrandId(brandId: string): Promise<Product[]>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;
    findInStock(): Promise<Product[]>;
    findOutOfStock(): Promise<Product[]>;
    findWithBrand(id: string): Promise<{
        product: Product;
        brand: Brand;
    } | null>;
    searchProducts(query: string): Promise<Product[]>;
}
