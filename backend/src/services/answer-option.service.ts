import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { AnswerOption } from '../models/answer-option.model';
import { AnswerOptionRepository } from '../repositories/answer-option.repository';
import { Question } from '../models/question.model';

@Injectable()
export class AnswerOptionService extends BaseService<AnswerOption> {
  constructor(private readonly answerOptionRepository: AnswerOptionRepository) {
    super(answerOptionRepository);
  }

  async createAnswerOption(answerOption: AnswerOption): Promise<AnswerOption> {
    if (!answerOption.question_id) {
      throw new Error('Question ID is required');
    }

    if (!answerOption.value) {
      throw new Error('Answer option value is required');
    }

    const existing = await this.answerOptionRepository.findByQuestionIdAndValue(
      answerOption.question_id,
      answerOption.value
    );

    if (existing) {
      throw new Error('This answer option already exists for the question');
    }

    return this.create(answerOption);
  }

  async updateAnswerOption(id: string, answerOption: Partial<AnswerOption>): Promise<AnswerOption> {
    if (answerOption.value === '') {
      throw new Error('Answer option value cannot be empty');
    }

    const existing = await this.findById(id);

    if (answerOption.value) {
      const duplicate = await this.answerOptionRepository.findByQuestionIdAndValue(
        existing.question_id,
        answerOption.value
      );
      if (duplicate && duplicate.id !== id) {
        throw new Error('This answer option already exists for the question');
      }
    }

    return this.update(id, answerOption);
  }

  async getQuestionOptions(questionId: string): Promise<AnswerOption[]> {
    return this.answerOptionRepository.findByQuestionId(questionId);
  }

  async getQuestionWithOptions(questionId: string): Promise<{ question: Question; options: AnswerOption[] }> {
    return this.answerOptionRepository.findQuestionWithOptions(questionId);
  }

  async searchByValue(value: string): Promise<AnswerOption[]> {
    return this.answerOptionRepository.findByValue(value);
  }
} 