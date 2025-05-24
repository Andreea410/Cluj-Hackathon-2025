import { BaseModel } from './base.model';
import { User } from './user.model';

export class PhotoUpload extends BaseModel {
  user_id: string;
  upload_date: Date;
  file_url: string;
  created_at: Date;
  auth_user_id?: string;
  user?: User; // Optional property for when user is included

  constructor(partial: Partial<PhotoUpload>) {
    super();
    Object.assign(this, partial);
    if (partial.upload_date) {
      this.upload_date = new Date(partial.upload_date);
    }
    if (partial.created_at) {
      this.created_at = new Date(partial.created_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      upload_date: this.upload_date,
      file_url: this.file_url,
      created_at: this.created_at,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() })
    };
  }

  static fromJSON(json: any): PhotoUpload {
    return new PhotoUpload({
      id: json.id,
      user_id: json.user_id,
      upload_date: json.upload_date,
      file_url: json.file_url,
      created_at: json.created_at,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) })
    });
  }
} 