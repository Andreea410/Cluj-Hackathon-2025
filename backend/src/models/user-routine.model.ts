import { BaseModel } from './base.model';
import { User } from './user.model';
import { RoutineTemplate } from './routine-template.model';

export class UserRoutine extends BaseModel {
  user_id: string;
  routine_template_id: string;
  assigned_at: Date;
  auth_user_id: string;
  user?: User; // Optional property for when user is included
  routineTemplate?: RoutineTemplate; // Optional property for when routine template is included

  constructor(partial: Partial<UserRoutine>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      routine_template_id: this.routine_template_id,
      assigned_at: this.assigned_at,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() }),
      ...(this.routineTemplate && { routineTemplate: this.routineTemplate.toJSON() })
    };
  }

  static fromJSON(json: any): UserRoutine {
    return new UserRoutine({
      id: json.id,
      user_id: json.user_id,
      routine_template_id: json.routine_template_id,
      assigned_at: json.assigned_at ? new Date(json.assigned_at) : undefined,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) }),
      ...(json.routine_template && { routineTemplate: RoutineTemplate.fromJSON(json.routine_template) })
    });
  }
} 