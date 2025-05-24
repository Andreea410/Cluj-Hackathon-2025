import { SupabaseClient } from '@supabase/supabase-js';
import { BaseModel } from '../models/base.model';
import { IBaseRepository } from './interfaces/base.repository.interface';
type ModelConstructor<T> = {
    new (partial: Partial<T>): T;
    fromJSON(json: any): T;
};
export declare abstract class BaseSupabaseRepository<T extends BaseModel> implements IBaseRepository<T> {
    protected readonly supabase: SupabaseClient;
    protected readonly tableName: string;
    protected readonly modelConstructor: ModelConstructor<T>;
    protected constructor(supabase: SupabaseClient, tableName: string, modelConstructor: ModelConstructor<T>);
    create(entity: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    update(id: string, entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}
export {};
