import { BaseModel } from './base.model';
import { User } from './user.model';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SkinInformation {
  skin_type?: string;
  concerns?: string[];
  allergies?: string[];
  current_products?: string[];
  additional_notes?: string;
}

export class SkinAnalysis extends BaseModel {
  user_id: string;
  messages: AIMessage[];
  skin_info: SkinInformation;
  created_at: Date;
  updated_at: Date;
  user?: User;

  constructor(partial: Partial<SkinAnalysis>) {
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
      messages: this.messages,
      skin_info: this.skin_info,
      created_at: this.created_at,
      updated_at: this.updated_at,
      ...(this.user && { user: this.user.toJSON() })
    };
  }

  static fromJSON(json: any): SkinAnalysis {
    return new SkinAnalysis({
      id: json.id,
      user_id: json.user_id,
      messages: json.messages,
      skin_info: json.skin_info,
      created_at: json.created_at,
      updated_at: json.updated_at,
      ...(json.user && { user: User.fromJSON(json.user) })
    });
  }
} 