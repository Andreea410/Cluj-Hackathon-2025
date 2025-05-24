import { AnswerOptionService } from '../services/answer-option.service';
import { AnswerOption } from '../models/answer-option.model';
import { Question } from '../models/question.model';
export declare class AnswerOptionController {
    private readonly answerOptionService;
    constructor(answerOptionService: AnswerOptionService);
    createAnswerOption(answerOption: AnswerOption): Promise<AnswerOption>;
    getAnswerOptions(value?: string): Promise<AnswerOption[]>;
    getQuestionOptions(questionId: string): Promise<AnswerOption[]>;
    getQuestionWithOptions(questionId: string): Promise<{
        question: Question;
        options: AnswerOption[];
    }>;
    getAnswerOption(id: string): Promise<AnswerOption>;
    updateAnswerOption(id: string, answerOption: Partial<AnswerOption>): Promise<AnswerOption>;
    deleteAnswerOption(id: string): Promise<void>;
}
