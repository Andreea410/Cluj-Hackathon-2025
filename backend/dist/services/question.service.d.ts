import { BaseService } from './base.service';
import { Question } from '../models/question.model';
import { IQuestionRepository } from '../repositories/interfaces/question.repository.interface';
export declare class QuestionService extends BaseService<Question> {
    private readonly questionRepository;
    constructor(questionRepository: IQuestionRepository);
    createQuestion(question: Question): Promise<Question>;
    updateQuestion(id: string, question: Partial<Question>): Promise<Question>;
    getQuestionsByFieldKey(fieldKey: string): Promise<Question[]>;
    searchQuestions(query: string): Promise<Question[]>;
    findByText(text: string): Promise<Question[]>;
}
