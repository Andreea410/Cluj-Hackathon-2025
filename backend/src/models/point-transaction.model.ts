import { BaseModel } from './base.model';
import { User } from './user.model';

export class PointTransaction extends BaseModel {
  user_id: string;
  points: number;
  auth_user_id: string;
  user?: User; // Optional property for when user is included

  constructor(partial: Partial<PointTransaction>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      points: this.points,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() })
    };
  }

  static fromJSON(json: any): PointTransaction {
    return new PointTransaction({
      id: json.id,
      user_id: json.user_id,
      points: json.points,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) })
    });
  }
} 