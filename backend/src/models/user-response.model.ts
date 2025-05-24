import { BaseModel } from './base.model';
import { User } from './user.model';
import { Question } from './question.model';
import { Option } from './option.model';

export class UserResponse extends BaseModel {
  user_id: string;
  question_id: string;
  option_id: string;
  auth_user_id: string;
  user?: User; // Optional property for when user is included
  question?: Question; // Optional property for when question is included
  option?: Option; // Optional property for when option is included

  constructor(partial: Partial<UserResponse>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      question_id: this.question_id,
      option_id: this.option_id,
      auth_user_id: this.auth_user_id,
      ...(this.user && { user: this.user.toJSON() }),
      ...(this.question && { question: this.question.toJSON() }),
      ...(this.option && { option: this.option.toJSON() })
    };
  }

  static fromJSON(json: any): UserResponse {
    return new UserResponse({
      id: json.id,
      user_id: json.user_id,
      question_id: json.question_id,
      option_id: json.option_id,
      auth_user_id: json.auth_user_id,
      ...(json.user && { user: User.fromJSON(json.user) }),
      ...(json.question && { question: Question.fromJSON(json.question) }),
      ...(json.option && { option: Option.fromJSON(json.option) })
    });
  }
} 