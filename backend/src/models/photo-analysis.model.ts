import { BaseModel } from './base.model';
import { PhotoUpload } from './photo-upload.model';

export class PhotoAnalysis extends BaseModel {
  photo_upload_id: string;
  analyzed_at: Date;
  metrics: Record<string, any>;
  photoUpload?: PhotoUpload; // Optional property for when photo upload is included

  constructor(partial: Partial<PhotoAnalysis>) {
    super();
    Object.assign(this, partial);
    if (partial.analyzed_at) {
      this.analyzed_at = new Date(partial.analyzed_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      photo_upload_id: this.photo_upload_id,
      analyzed_at: this.analyzed_at,
      metrics: this.metrics,
      ...(this.photoUpload && { photoUpload: this.photoUpload.toJSON() })
    };
  }

  static fromJSON(json: any): PhotoAnalysis {
    return new PhotoAnalysis({
      id: json.id,
      photo_upload_id: json.photo_upload_id,
      analyzed_at: json.analyzed_at,
      metrics: json.metrics,
      ...(json.photo_upload && { photoUpload: PhotoUpload.fromJSON(json.photo_upload) })
    });
  }
} 