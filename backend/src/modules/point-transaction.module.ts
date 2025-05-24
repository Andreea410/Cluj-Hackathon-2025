import { Module } from '@nestjs/common';
import { PointTransactionService } from '../services/point-transaction.service';
import { PointTransactionController } from '../controllers/point-transaction.controller';
import { PointTransactionRepository } from '../repositories/point-transaction.repository';
import { SupabaseClient } from '@supabase/supabase-js';

@Module({
  controllers: [PointTransactionController],
  providers: [
    PointTransactionService,
    {
      provide: SupabaseClient,
      useFactory: () => {
        return new SupabaseClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_KEY!
        );
      },
    },
    PointTransactionRepository,
  ],
  exports: [PointTransactionService],
})
export class PointTransactionModule {} 