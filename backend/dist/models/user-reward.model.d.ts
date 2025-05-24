import { BaseModel } from './base.model';
import { User } from './user.model';
import { Reward } from './reward.model';
export declare class UserReward extends BaseModel {
    user_id: string;
    reward_id: string;
    claimed_at: Date;
    auth_user_id: string;
    user?: User;
    reward?: Reward;
    constructor(partial: Partial<UserReward>);
    toJSON(): {
        reward: {
            name: string;
            description: string;
            threshold_points: number;
        };
        user: {
            role: {
                name: string;
                permissions: string[];
            };
            email: string;
            hashed_password: string;
            role_id: string;
            first_name: string;
            last_name: string;
        };
        user_id: string;
        reward_id: string;
        claimed_at: Date;
        auth_user_id: string;
    };
    static fromJSON(json: any): UserReward;
}
