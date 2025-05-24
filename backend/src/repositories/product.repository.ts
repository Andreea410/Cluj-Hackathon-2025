import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IProductRepository } from './interfaces/product.repository.interface';
import { Product } from '../models/product.model';
import { Brand } from '../models/brand.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class ProductRepository extends BaseSupabaseRepository<Product> implements IProductRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'products', Product);
  }

  async findByName(name: string): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', name)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? Product.fromJSON(data) : null;
  }

  async findByBrandId(brandId: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('brand_id', brandId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Product.fromJSON(item));
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('price', minPrice)
      .lte('price', maxPrice);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Product.fromJSON(item));
  }

  async findInStock(): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gt('stock', 0);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Product.fromJSON(item));
  }

  async findOutOfStock(): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('stock', 0);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Product.fromJSON(item));
  }

  async findWithBrand(id: string): Promise<{ product: Product; brand: Brand } | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        brands:brand_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    if (!data) return null;

    return {
      product: Product.fromJSON(data),
      brand: Brand.fromJSON(data.brands)
    };
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`name.ilike.%${query}%, description.ilike.%${query}%`);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Product.fromJSON(item));
  }
} 