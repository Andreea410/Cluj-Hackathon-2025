import { BaseModel } from './base.model';
import { UserRoutine } from './user-routine.model';

export class UserRoutineLog extends BaseModel {
  user_routine_id: string;
  log_date: Date;
  completed_steps: number;
  auth_user_id: string;
  userRoutine?: UserRoutine; // Optional property for when user routine is included

  constructor(partial: Partial<UserRoutineLog>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_routine_id: this.user_routine_id,
      log_date: this.log_date,
      completed_steps: this.completed_steps,
      auth_user_id: this.auth_user_id,
      ...(this.userRoutine && { userRoutine: this.userRoutine.toJSON() })
    };
  }

  static fromJSON(json: any): UserRoutineLog {
    return new UserRoutineLog({
      id: json.id,
      user_routine_id: json.user_routine_id,
      log_date: json.log_date ? new Date(json.log_date) : undefined,
      completed_steps: json.completed_steps,
      auth_user_id: json.auth_user_id,
      ...(json.user_routine && { userRoutine: UserRoutine.fromJSON(json.user_routine) })
    });
  }
} 