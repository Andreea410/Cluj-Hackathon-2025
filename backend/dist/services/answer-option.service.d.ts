import { BaseService } from './base.service';
import { AnswerOption } from '../models/answer-option.model';
import { AnswerOptionRepository } from '../repositories/answer-option.repository';
import { Question } from '../models/question.model';
export declare class AnswerOptionService extends BaseService<AnswerOption> {
    private readonly answerOptionRepository;
    constructor(answerOptionRepository: AnswerOptionRepository);
    createAnswerOption(answerOption: AnswerOption): Promise<AnswerOption>;
    updateAnswerOption(id: string, answerOption: Partial<AnswerOption>): Promise<AnswerOption>;
    getQuestionOptions(questionId: string): Promise<AnswerOption[]>;
    getQuestionWithOptions(questionId: string): Promise<{
        question: Question;
        options: AnswerOption[];
    }>;
    searchByValue(value: string): Promise<AnswerOption[]>;
}
