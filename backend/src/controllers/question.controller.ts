import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(@Body() question: Question): Promise<Question> {
    try {
      return await this.questionService.createQuestion(question);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getQuestions(@Query('search') search?: string): Promise<Question[]> {
    try {
      if (search) {
        return await this.questionService.searchQuestions(search);
      }
      return await this.questionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('field/:fieldKey')
  async getQuestionsByFieldKey(@Param('fieldKey') fieldKey: string): Promise<Question[]> {
    try {
      return await this.questionService.getQuestionsByFieldKey(fieldKey);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search/text')
  async searchByText(@Query('query') query: string): Promise<Question[]> {
    try {
      return await this.questionService.findByText(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<Question> {
    try {
      return await this.questionService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() question: Partial<Question>
  ): Promise<Question> {
    try {
      return await this.questionService.updateQuestion(id, question);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string): Promise<void> {
    try {
      await this.questionService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 