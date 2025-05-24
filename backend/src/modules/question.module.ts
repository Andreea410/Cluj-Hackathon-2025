import { Module } from '@nestjs/common';
import { QuestionController } from '../controllers/question.controller';
import { QuestionService } from '../services/question.service';
import { QuestionRepository } from '../repositories/question.repository';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService]
})
export class QuestionModule {} 