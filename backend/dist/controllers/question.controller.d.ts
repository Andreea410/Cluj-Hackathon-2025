import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(question: Question): Promise<Question>;
    getQuestions(search?: string): Promise<Question[]>;
    getQuestionsByFieldKey(fieldKey: string): Promise<Question[]>;
    searchByText(query: string): Promise<Question[]>;
    getQuestion(id: string): Promise<Question>;
    updateQuestion(id: string, question: Partial<Question>): Promise<Question>;
    deleteQuestion(id: string): Promise<void>;
}
