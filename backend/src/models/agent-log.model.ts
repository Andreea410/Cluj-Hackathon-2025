import { BaseModel } from './base.model';
import { User } from './user.model';

export class AgentLog extends BaseModel {
  user_id: string;
  role: string;
  message: Record<string, any>;
  user?: User;

  constructor(partial: Partial<AgentLog>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      role: this.role,
      message: this.message,
      ...(this.user && { user: this.user.toJSON() })
    };
  }

  static fromJSON(json: any): AgentLog {
    return new AgentLog({
      id: json.id,
      user_id: json.user_id,
      role: json.role,
      message: json.message,
      ...(json.user && { user: User.fromJSON(json.user) })
    });
  }
} 