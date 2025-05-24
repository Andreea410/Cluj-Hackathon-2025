import { BaseModel } from './base.model';
import { User } from './user.model';
import { PhotoAnalysis } from './photo-analysis.model';

export class RoutineAdjustment extends BaseModel {
  user_id: string;
  photo_analysis_id: string;
  actions: Record<string, any>;
  auth_user_id?: string;
  user?: User; // Optional property for when user is included
  photoAnalysis?: PhotoAnalysis; // Optional property for when photo analysis is included

  constructor(partial: Partial<RoutineAdjustment>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      photo_analysis_id: this.photo_analysis_id,
      actions: this.actions,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() }),
      ...(this.photoAnalysis && { photoAnalysis: this.photoAnalysis.toJSON() })
    };
  }

  static fromJSON(json: any): RoutineAdjustment {
    return new RoutineAdjustment({
      id: json.id,
      user_id: json.user_id,
      photo_analysis_id: json.photo_analysis_id,
      actions: json.actions,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) }),
      ...(json.photo_analysis && { photoAnalysis: PhotoAnalysis.fromJSON(json.photo_analysis) })
    });
  }
} 