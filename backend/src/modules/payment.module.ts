import { Module } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentRepository } from '../repositories/payment.repository';
import { SupabaseClient } from '@supabase/supabase-js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
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
  exports: [PaymentService],
})
export class PaymentModule {} 