import { Module } from '@nestjs/common';
import { AnswerOptionController } from '../controllers/answer-option.controller';
import { AnswerOptionService } from '../services/answer-option.service';
import { AnswerOptionRepository } from '../repositories/answer-option.repository';
import { SupabaseClient } from '@supabase/supabase-js';

@Module({
  controllers: [AnswerOptionController],
  providers: [
    AnswerOptionService,
    AnswerOptionRepository,
    {
      provide: SupabaseClient,
      useFactory: () => {
        return new SupabaseClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_KEY!
        );
      },
    },
  ],
  exports: [AnswerOptionService]
})
export class AnswerOptionModule {} 