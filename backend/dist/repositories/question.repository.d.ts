import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IQuestionRepository } from './interfaces/question.repository.interface';
import { Question } from '../models/question.model';
export declare class QuestionRepository extends BaseSupabaseRepository<Question> implements IQuestionRepository {
    constructor(supabase: SupabaseClient);
    findByFieldKey(fieldKey: string): Promise<Question[]>;
    findByText(text: string): Promise<Question[]>;
    searchQuestions(query: string): Promise<Question[]>;
}
