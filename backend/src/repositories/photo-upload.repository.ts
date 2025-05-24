import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPhotoUploadRepository } from './interfaces/photo-upload.repository.interface';
import { PhotoUpload } from '../models/photo-upload.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class PhotoUploadRepository extends BaseSupabaseRepository<PhotoUpload> implements IPhotoUploadRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'photo_uploads', PhotoUpload);
  }

  async findByUserId(userId: string): Promise<PhotoUpload[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('upload_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoUpload.fromJSON(item));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PhotoUpload[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('upload_date', startDate.toISOString())
      .lte('upload_date', endDate.toISOString())
      .order('upload_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoUpload.fromJSON(item));
  }

  async findWithUser(id: string): Promise<PhotoUpload | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? PhotoUpload.fromJSON(data) : null;
  }

  async findAllWithUsers(): Promise<PhotoUpload[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*)
      `)
      .order('upload_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoUpload.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<PhotoUpload[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId)
      .order('upload_date', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoUpload.fromJSON(item));
  }
} 