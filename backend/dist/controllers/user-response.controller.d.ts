import { UserResponseService } from '../services/user-response.service';
import { UserResponse } from '../models/user-response.model';
export declare class UserResponseController {
    private readonly userResponseService;
    constructor(userResponseService: UserResponseService);
    createUserResponse(userResponse: UserResponse): Promise<UserResponse>;
    bulkCreateUserResponses(userId: string, data: {
        responses: Array<{
            questionId: string;
            optionId: string;
        }>;
    }): Promise<UserResponse[]>;
    getUserResponse(id: string, includeRelations?: boolean): Promise<UserResponse>;
    getAllUserResponses(userId?: string, questionId?: string, optionId?: string, authUserId?: string, includeRelations?: boolean): Promise<UserResponse[]>;
    getResponseStatistics(questionId: string): Promise<{
        totalResponses: number;
        optionCounts: Record<string, number>;
        optionPercentages: Record<string, number>;
    }>;
    updateUserResponse(id: string, userResponse: UserResponse): Promise<UserResponse>;
    deleteUserResponse(id: string): Promise<void>;
}
