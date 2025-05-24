import { BaseService } from './base.service';
import { SkinQuestionnaire, QuestionnaireResponse } from '../models/skin-questionnaire.model';
import { IBaseRepository } from '../repositories/interfaces/base.repository.interface';
export declare class SkinQuestionnaireService extends BaseService<SkinQuestionnaire> {
    private readonly questionnaireRepository;
    private readonly questions;
    constructor(questionnaireRepository: IBaseRepository<SkinQuestionnaire>);
    getQuestions(): {
        id: string;
        question: string;
        options: string[];
    }[];
    submitResponses(userId: string, responses: QuestionnaireResponse[]): Promise<SkinQuestionnaire>;
    private validateResponses;
}
