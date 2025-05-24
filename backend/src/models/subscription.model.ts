import { BaseModel } from './base.model';
import { User } from './user.model';
import { Plan } from './plan.model';

export class Subscription extends BaseModel {
  user_id: string;
  plan_id: string;
  start_date: Date;
  end_date?: Date;
  status: string;
  auth_user_id?: string;
  user?: User; // Optional property for when user is included
  plan?: Plan; // Optional property for when plan is included

  constructor(partial: Partial<Subscription>) {
    super();
    Object.assign(this, partial);
    if (partial.start_date) {
      this.start_date = new Date(partial.start_date);
    }
    if (partial.end_date) {
      this.end_date = new Date(partial.end_date);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      plan_id: this.plan_id,
      start_date: this.start_date,
      end_date: this.end_date,
      status: this.status,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() }),
      ...(this.plan && { plan: this.plan.toJSON() })
    };
  }

  static fromJSON(json: any): Subscription {
    return new Subscription({
      id: json.id,
      user_id: json.user_id,
      plan_id: json.plan_id,
      start_date: json.start_date,
      end_date: json.end_date,
      status: json.status,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) }),
      ...(json.plan && { plan: Plan.fromJSON(json.plan) })
    });
  }
} 