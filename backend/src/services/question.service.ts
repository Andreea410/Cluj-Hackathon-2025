import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Question } from '../models/question.model';
import { IQuestionRepository } from '../repositories/interfaces/question.repository.interface';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(private readonly questionRepository: IQuestionRepository) {
    super(questionRepository);
  }

  async createQuestion(question: Question): Promise<Question> {
    if (!question.text) {
      throw new Error('Question text is required');
    }

    if (!question.field_key) {
      throw new Error('Field key is required');
    }

    return this.create(question);
  }

  async updateQuestion(id: string, question: Partial<Question>): Promise<Question> {
    if (question.text === '') {
      throw new Error('Question text cannot be empty');
    }

    if (question.field_key === '') {
      throw new Error('Field key cannot be empty');
    }

    return this.update(id, question);
  }

  async getQuestionsByFieldKey(fieldKey: string): Promise<Question[]> {
    return this.questionRepository.findByFieldKey(fieldKey);
  }

  async searchQuestions(query: string): Promise<Question[]> {
    if (!query) {
      return this.findAll();
    }
    return this.questionRepository.searchQuestions(query);
  }

  async findByText(text: string): Promise<Question[]> {
    return this.questionRepository.findByText(text);
  }
} 