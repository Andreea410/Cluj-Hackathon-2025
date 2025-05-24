import { BaseModel } from './base.model';
import { User } from './user.model';

export interface RoutineStep {
  product_id: string;
  order: number;
  time_of_day: 'morning' | 'evening';
  instructions: string;
  completed: boolean;
  completed_at?: Date;
}

export class SkincareRoutine extends BaseModel {
  user_id: string;
  name: string;
  steps: RoutineStep[];
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  points_earned: number;
  user?: User;

  constructor(partial: Partial<SkincareRoutine>) {
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
      name: this.name,
      steps: this.steps,
      created_at: this.created_at,
      updated_at: this.updated_at,
      is_active: this.is_active,
      points_earned: this.points_earned,
      ...(this.user && { user: this.user.toJSON() })
    };
  }

  static fromJSON(json: any): SkincareRoutine {
    return new SkincareRoutine({
      id: json.id,
      user_id: json.user_id,
      name: json.name,
      steps: json.steps,
      created_at: json.created_at,
      updated_at: json.updated_at,
      is_active: json.is_active,
      points_earned: json.points_earned,
      ...(json.user && { user: User.fromJSON(json.user) })
    });
  }
} 