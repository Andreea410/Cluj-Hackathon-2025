import { BaseModel } from './base.model';

export class Role extends BaseModel {
  name: string;
  permissions: string[];

  constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      permissions: this.permissions
    };
  }

  static fromJSON(json: any): Role {
    return new Role({
      id: json.id,
      name: json.name,
      permissions: json.permissions
    });
  }
} 