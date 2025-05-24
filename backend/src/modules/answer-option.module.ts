import { Module } from '@nestjs/common';
import { AnswerOptionController } from '../controllers/answer-option.controller';
import { AnswerOptionService } from '../services/answer-option.service';
import { AnswerOptionRepository } from '../repositories/answer-option.repository';

@Module({
  controllers: [AnswerOptionController],
  providers: [AnswerOptionService, AnswerOptionRepository],
  exports: [AnswerOptionService]
})
export class AnswerOptionModule {} 