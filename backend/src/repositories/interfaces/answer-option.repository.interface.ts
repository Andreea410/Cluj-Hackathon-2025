import { IBaseRepository } from './base.repository.interface';
import { AnswerOption } from '../../models/answer-option.model';
import { Question } from '../../models/question.model';

export interface IAnswerOptionRepository extends IBaseRepository<AnswerOption> {
  findByQuestionId(questionId: string): Promise<AnswerOption[]>;
  findByValue(value: string): Promise<AnswerOption[]>;
  findQuestionWithOptions(questionId: string): Promise<{ question: Question; options: AnswerOption[] }>;
  findByQuestionIdAndValue(questionId: string, value: string): Promise<AnswerOption | null>;
} 