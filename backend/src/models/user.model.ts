import { BaseModel } from './base.model';
import { Role } from './role.model';

export class User extends BaseModel {
  email: string;
  hashed_password: string;
  role_id: string;
  created_at: Date;
  role?: Role; // Optional property for when role is included

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
    if (partial.created_at) {
      this.created_at = new Date(partial.created_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      email: this.email,
      hashed_password: this.hashed_password,
      role_id: this.role_id,
      created_at: this.created_at,
      ...(this.role && { role: this.role.toJSON() })
    };
  }

  static fromJSON(json: any): User {
    return new User({
      id: json.id,
      email: json.email,
      hashed_password: json.hashed_password,
      role_id: json.role_id,
      created_at: json.created_at,
      ...(json.role && { role: Role.fromJSON(json.role) })
    });
  }
} 