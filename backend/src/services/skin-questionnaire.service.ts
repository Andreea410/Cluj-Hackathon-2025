import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SkinQuestionnaire, QuestionnaireResponse } from '../models/skin-questionnaire.model';
import { IBaseRepository } from '../repositories/interfaces/base.repository.interface';

@Injectable()
export class SkinQuestionnaireService extends BaseService<SkinQuestionnaire> {
  private readonly questions = [
    {
      id: 'skin_type',
      question: 'What is your skin type?',
      options: ['dry', 'oily', 'combination', 'normal', 'sensitive']
    },
    {
      id: 'breakouts',
      question: 'How often do you experience breakouts?',
      options: ['rare', 'occasional', 'frequent', 'constant']
    },
    {
      id: 'concerns',
      question: 'What are your main skin concerns? (Select all that apply)',
      options: ['acne', 'aging', 'dryness', 'oiliness', 'sensitivity', 'hyperpigmentation']
    },
    {
      id: 'allergies',
      question: 'Do you have any known skin allergies?',
      options: ['none', 'fragrance', 'certain ingredients', 'multiple allergies']
    },
    {
      id: 'current_products',
      question: 'What products are you currently using?',
      options: ['cleanser', 'moisturizer', 'sunscreen', 'serum', 'none']
    }
  ];

  constructor(private readonly questionnaireRepository: IBaseRepository<SkinQuestionnaire>) {
    super(questionnaireRepository);
  }

  getQuestions() {
    return this.questions;
  }

  async submitResponses(userId: string, responses: QuestionnaireResponse[]): Promise<SkinQuestionnaire> {
    // Validate responses
    this.validateResponses(responses);

    // Create questionnaire record
    const questionnaire = new SkinQuestionnaire({
      user_id: userId,
      responses,
      created_at: new Date()
    });

    return this.create(questionnaire);
  }

  private validateResponses(responses: QuestionnaireResponse[]) {
    // Check if all required questions are answered
    const answeredQuestionIds = responses.map(r => r.question_id);
    const requiredQuestionIds = this.questions.map(q => q.id);

    const missingQuestions = requiredQuestionIds.filter(
      id => !answeredQuestionIds.includes(id)
    );

    if (missingQuestions.length > 0) {
      throw new Error(`Missing answers for questions: ${missingQuestions.join(', ')}`);
    }

    // Validate each response against available options
    responses.forEach(response => {
      const question = this.questions.find(q => q.id === response.question_id);
      if (!question) {
        throw new Error(`Invalid question ID: ${response.question_id}`);
      }

      if (!question.options.includes(response.answer)) {
        throw new Error(`Invalid answer for question ${response.question_id}`);
      }
    });
  }
} 