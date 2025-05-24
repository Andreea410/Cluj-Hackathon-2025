import { BaseModel } from './base.model';
import { Role } from './role.model';

export class User extends BaseModel {
  email: string;
  hashed_password: string;
  role_id: string;
  first_name: string;
  last_name: string;
  role?: Role; // Optional property for when role is included
  password?: string; // Temporary field for password handling

  constructor(partial: Partial<User> & { password?: string }) {
    super();
    const { password, ...userData } = partial;
    Object.assign(this, userData);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      email: this.email,
      hashed_password: this.hashed_password,
      role_id: this.role_id,
      first_name: this.first_name,
      last_name: this.last_name,
      ...(this.role && { role: this.role.toJSON() })
    };
  }

  static fromJSON(json: any): User {
    return new User({
      id: json.id,
      email: json.email,
      hashed_password: json.hashed_password,
      role_id: json.role_id,
      first_name: json.first_name,
      last_name: json.last_name,
      ...(json.role && { role: Role.fromJSON(json.role) })
    });
  }
} 