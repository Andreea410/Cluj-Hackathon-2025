import { IBaseRepository } from './base.repository.interface';
import { UserResponse } from '../../models/user-response.model';
export interface IUserResponseRepository extends IBaseRepository<UserResponse> {
    findByUserId(userId: string): Promise<UserResponse[]>;
    findByQuestionId(questionId: string): Promise<UserResponse[]>;
    findByOptionId(optionId: string): Promise<UserResponse[]>;
    findByAuthUserId(authUserId: string): Promise<UserResponse[]>;
    findByUserAndQuestion(userId: string, questionId: string): Promise<UserResponse | null>;
    findWithRelations(id: string): Promise<UserResponse | null>;
    findAllWithRelations(): Promise<UserResponse[]>;
    findAllByUserWithDetails(userId: string): Promise<UserResponse[]>;
    findAllByQuestionWithDetails(questionId: string): Promise<UserResponse[]>;
    findAllByOptionWithDetails(optionId: string): Promise<UserResponse[]>;
    countResponsesByOption(questionId: string): Promise<Record<string, number>>;
}
