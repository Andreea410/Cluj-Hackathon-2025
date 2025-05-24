import { BaseModel } from './base.model';
import { User } from './user.model';
import { Reward } from './reward.model';

export class UserReward extends BaseModel {
  user_id: string;
  reward_id: string;
  claimed_at: Date;
  auth_user_id: string;
  user?: User; // Optional property for when user is included
  reward?: Reward; // Optional property for when reward is included

  constructor(partial: Partial<UserReward>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      reward_id: this.reward_id,
      claimed_at: this.claimed_at,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() }),
      ...(this.reward && { reward: this.reward.toJSON() })
    };
  }

  static fromJSON(json: any): UserReward {
    return new UserReward({
      id: json.id,
      user_id: json.user_id,
      reward_id: json.reward_id,
      claimed_at: json.claimed_at ? new Date(json.claimed_at) : undefined,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) }),
      ...(json.reward && { reward: Reward.fromJSON(json.reward) })
    });
  }
} 