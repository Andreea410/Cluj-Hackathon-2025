import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IBrandRepository } from './interfaces/brand.repository.interface';
import { Brand } from '../models/brand.model';
export declare class BrandRepository extends BaseSupabaseRepository<Brand> implements IBrandRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<Brand | null>;
    findByWebsite(website: string): Promise<Brand | null>;
}
