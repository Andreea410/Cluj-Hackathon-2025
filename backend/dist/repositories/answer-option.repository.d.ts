import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IAnswerOptionRepository } from './interfaces/answer-option.repository.interface';
import { AnswerOption } from '../models/answer-option.model';
import { Question } from '../models/question.model';
export declare class AnswerOptionRepository extends BaseSupabaseRepository<AnswerOption> implements IAnswerOptionRepository {
    constructor(supabase: SupabaseClient);
    findByQuestionId(questionId: string): Promise<AnswerOption[]>;
    findByValue(value: string): Promise<AnswerOption[]>;
    findQuestionWithOptions(questionId: string): Promise<{
        question: Question;
        options: AnswerOption[];
    }>;
    findByQuestionIdAndValue(questionId: string, value: string): Promise<AnswerOption | null>;
}
