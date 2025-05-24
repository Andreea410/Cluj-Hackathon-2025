import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AnswerOptionService } from '../services/answer-option.service';
import { AnswerOption } from '../models/answer-option.model';
import { Question } from '../models/question.model';

@Controller('answer-options')
export class AnswerOptionController {
  constructor(private readonly answerOptionService: AnswerOptionService) {}

  @Post()
  async createAnswerOption(@Body() answerOption: AnswerOption): Promise<AnswerOption> {
    try {
      return await this.answerOptionService.createAnswerOption(answerOption);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAnswerOptions(@Query('value') value?: string): Promise<AnswerOption[]> {
    try {
      if (value) {
        return await this.answerOptionService.searchByValue(value);
      }
      return await this.answerOptionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('question/:questionId')
  async getQuestionOptions(@Param('questionId') questionId: string): Promise<AnswerOption[]> {
    try {
      return await this.answerOptionService.getQuestionOptions(questionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('question/:questionId/with-options')
  async getQuestionWithOptions(
    @Param('questionId') questionId: string
  ): Promise<{ question: Question; options: AnswerOption[] }> {
    try {
      return await this.answerOptionService.getQuestionWithOptions(questionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getAnswerOption(@Param('id') id: string): Promise<AnswerOption> {
    try {
      const option = await this.answerOptionService.findById(id);
      if (!option) {
        throw new HttpException('Answer option not found', HttpStatus.NOT_FOUND);
      }
      return option;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateAnswerOption(
    @Param('id') id: string,
    @Body() answerOption: Partial<AnswerOption>
  ): Promise<AnswerOption> {
    try {
      return await this.answerOptionService.updateAnswerOption(id, answerOption);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteAnswerOption(@Param('id') id: string): Promise<void> {
    try {
      await this.answerOptionService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 