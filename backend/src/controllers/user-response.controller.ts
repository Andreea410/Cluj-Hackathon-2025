import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserResponseService } from '../services/user-response.service';
import { UserResponse } from '../models/user-response.model';

@Controller('user-responses')
export class UserResponseController {
  constructor(private readonly userResponseService: UserResponseService) {}

  @Post()
  async createUserResponse(@Body() userResponse: UserResponse): Promise<UserResponse> {
    try {
      return await this.userResponseService.createUserResponse(userResponse);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk/:userId')
  async bulkCreateUserResponses(
    @Param('userId') userId: string,
    @Body() data: { responses: Array<{ questionId: string; optionId: string }> }
  ): Promise<UserResponse[]> {
    try {
      return await this.userResponseService.bulkCreateUserResponses(userId, data.responses);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserResponse(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<UserResponse> {
    try {
      if (includeRelations) {
        const response = await this.userResponseService.findWithRelations(id);
        if (!response) throw new Error('User response not found');
        return response;
      }
      const response = await this.userResponseService.findById(id);
      if (!response) throw new Error('User response not found');
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllUserResponses(
    @Query('userId') userId?: string,
    @Query('questionId') questionId?: string,
    @Query('optionId') optionId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<UserResponse[]> {
    try {
      if (userId && questionId) {
        const response = await this.userResponseService.findByUserAndQuestion(userId, questionId);
        return response ? [response] : [];
      }
      if (userId) {
        return await this.userResponseService.findAllByUserWithDetails(userId);
      }
      if (questionId) {
        return await this.userResponseService.findAllByQuestionWithDetails(questionId);
      }
      if (optionId) {
        return await this.userResponseService.findAllByOptionWithDetails(optionId);
      }
      if (authUserId) {
        return await this.userResponseService.findByAuthUserId(authUserId);
      }
      if (includeRelations) {
        return await this.userResponseService.findAllWithRelations();
      }
      return await this.userResponseService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('statistics/question/:questionId')
  async getResponseStatistics(@Param('questionId') questionId: string) {
    try {
      return await this.userResponseService.getResponseStatistics(questionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateUserResponse(
    @Param('id') id: string,
    @Body() userResponse: UserResponse
  ): Promise<UserResponse> {
    try {
      return await this.userResponseService.updateUserResponse(id, userResponse);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUserResponse(@Param('id') id: string): Promise<void> {
    try {
      await this.userResponseService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 