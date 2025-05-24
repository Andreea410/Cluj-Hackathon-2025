import { BaseModel } from './base.model';
import { User } from './user.model';

export interface SkinConcern {
  type: string;
  severity: 'mild' | 'moderate' | 'severe';
  description?: string;
}

export interface SkinType {
  type: 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';
  description?: string;
}

export class SkinProfile extends BaseModel {
  user_id: string;
  skin_type: SkinType;
  concerns: SkinConcern[];
  breakouts_frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
  allergies: string[];
  current_products: string[];
  created_at: Date;
  updated_at: Date;
  user?: User;

  constructor(partial: Partial<SkinProfile>) {
    super();
    Object.assign(this, partial);
    if (partial.created_at) {
      this.created_at = new Date(partial.created_at);
    }
    if (partial.updated_at) {
      this.updated_at = new Date(partial.updated_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      skin_type: this.skin_type,
      concerns: this.concerns,
      breakouts_frequency: this.breakouts_frequency,
      allergies: this.allergies,
      current_products: this.current_products,
      created_at: this.created_at,
      updated_at: this.updated_at,
      ...(this.user && { user: this.user.toJSON() })
    };
  }

  static fromJSON(json: any): SkinProfile {
    return new SkinProfile({
      id: json.id,
      user_id: json.user_id,
      skin_type: json.skin_type,
      concerns: json.concerns,
      breakouts_frequency: json.breakouts_frequency,
      allergies: json.allergies,
      current_products: json.current_products,
      created_at: json.created_at,
      updated_at: json.updated_at,
      ...(json.user && { user: User.fromJSON(json.user) })
    });
  }
} 