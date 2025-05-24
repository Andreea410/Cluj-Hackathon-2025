import { IBaseRepository } from './base.repository.interface';
import { Question } from '../../models/question.model';
export interface IQuestionRepository extends IBaseRepository<Question> {
    findByFieldKey(fieldKey: string): Promise<Question[]>;
    findByText(text: string): Promise<Question[]>;
    searchQuestions(query: string): Promise<Question[]>;
}
