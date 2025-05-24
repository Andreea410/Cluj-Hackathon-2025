import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserResponse } from '../models/user-response.model';
import { UserResponseRepository } from '../repositories/user-response.repository';

@Injectable()
export class UserResponseService extends BaseService<UserResponse> {
  constructor(private readonly userResponseRepository: UserResponseRepository) {
    super(userResponseRepository);
  }

  async createUserResponse(userResponse: UserResponse): Promise<UserResponse> {
    // Check for existing response from this user for this question
    const existing = await this.userResponseRepository.findByUserAndQuestion(
      userResponse.user_id,
      userResponse.question_id
    );

    if (existing) {
      throw new Error('User has already responded to this question');
    }

    return this.create(userResponse);
  }

  async findByUserId(userId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findByUserId(userId);
  }

  async findByQuestionId(questionId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findByQuestionId(questionId);
  }

  async findByOptionId(optionId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findByOptionId(optionId);
  }

  async findByAuthUserId(authUserId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findByAuthUserId(authUserId);
  }

  async findByUserAndQuestion(userId: string, questionId: string): Promise<UserResponse | null> {
    return this.userResponseRepository.findByUserAndQuestion(userId, questionId);
  }

  async findWithRelations(id: string): Promise<UserResponse | null> {
    return this.userResponseRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<UserResponse[]> {
    return this.userResponseRepository.findAllWithRelations();
  }

  async findAllByUserWithDetails(userId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findAllByUserWithDetails(userId);
  }

  async findAllByQuestionWithDetails(questionId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findAllByQuestionWithDetails(questionId);
  }

  async findAllByOptionWithDetails(optionId: string): Promise<UserResponse[]> {
    return this.userResponseRepository.findAllByOptionWithDetails(optionId);
  }

  async updateUserResponse(id: string, userResponse: UserResponse): Promise<UserResponse> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('User response not found');
    }

    // If changing question or user, check for existing response
    if (
      (userResponse.user_id !== existing.user_id || 
       userResponse.question_id !== existing.question_id) &&
      await this.findByUserAndQuestion(userResponse.user_id, userResponse.question_id)
    ) {
      throw new Error('User has already responded to this question');
    }

    return this.update(id, userResponse);
  }

  async getResponseStatistics(questionId: string): Promise<{
    totalResponses: number;
    optionCounts: Record<string, number>;
    optionPercentages: Record<string, number>;
  }> {
    const optionCounts = await this.userResponseRepository.countResponsesByOption(questionId);
    const totalResponses = Object.values(optionCounts).reduce((sum, count) => sum + count, 0);

    const optionPercentages = Object.entries(optionCounts).reduce((acc, [optionId, count]) => ({
      ...acc,
      [optionId]: totalResponses > 0 ? (count / totalResponses) * 100 : 0
    }), {});

    return {
      totalResponses,
      optionCounts,
      optionPercentages
    };
  }

  async bulkCreateUserResponses(
    userId: string,
    responses: Array<{ questionId: string; optionId: string }>
  ): Promise<UserResponse[]> {
    const results: UserResponse[] = [];

    for (const response of responses) {
      try {
        const userResponse = await this.createUserResponse(new UserResponse({
          user_id: userId,
          question_id: response.questionId,
          option_id: response.optionId
        }));
        results.push(userResponse);
      } catch (error) {
        // Skip if response already exists
        if (!error.message.includes('already responded')) {
          throw error;
        }
      }
    }

    return results;
  }
} 