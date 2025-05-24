import { BaseService } from './base.service';
import { UserResponse } from '../models/user-response.model';
import { UserResponseRepository } from '../repositories/user-response.repository';
export declare class UserResponseService extends BaseService<UserResponse> {
    private readonly userResponseRepository;
    constructor(userResponseRepository: UserResponseRepository);
    createUserResponse(userResponse: UserResponse): Promise<UserResponse>;
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
    updateUserResponse(id: string, userResponse: UserResponse): Promise<UserResponse>;
    getResponseStatistics(questionId: string): Promise<{
        totalResponses: number;
        optionCounts: Record<string, number>;
        optionPercentages: Record<string, number>;
    }>;
    bulkCreateUserResponses(userId: string, responses: Array<{
        questionId: string;
        optionId: string;
    }>): Promise<UserResponse[]>;
}
