import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPhotoAnalysisRepository } from './interfaces/photo-analysis.repository.interface';
import { PhotoAnalysis } from '../models/photo-analysis.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class PhotoAnalysisRepository extends BaseSupabaseRepository<PhotoAnalysis> implements IPhotoAnalysisRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'photo_analyses', PhotoAnalysis);
  }

  async findByPhotoUploadId(photoUploadId: string): Promise<PhotoAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('photo_upload_id', photoUploadId)
      .order('analyzed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoAnalysis.fromJSON(item));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PhotoAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .gte('analyzed_at', startDate.toISOString())
      .lte('analyzed_at', endDate.toISOString())
      .order('analyzed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoAnalysis.fromJSON(item));
  }

  async findWithPhotoUpload(id: string): Promise<PhotoAnalysis | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        photo_upload:photo_upload_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? PhotoAnalysis.fromJSON(data) : null;
  }

  async findAllWithPhotoUploads(): Promise<PhotoAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        photo_upload:photo_upload_id (*)
      `)
      .order('analyzed_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => PhotoAnalysis.fromJSON(item));
  }
} 