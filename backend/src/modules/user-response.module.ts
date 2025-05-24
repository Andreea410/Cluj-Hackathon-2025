import { Module } from '@nestjs/common';
import { UserResponseService } from '../services/user-response.service';
import { UserResponseController } from '../controllers/user-response.controller';
import { UserResponseRepository } from '../repositories/user-response.repository';
import { SupabaseClient } from '@supabase/supabase-js';

@Module({
  controllers: [UserResponseController],
  providers: [
    UserResponseService,
    {
      provide: SupabaseClient,
      useFactory: () => {
        return new SupabaseClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_KEY!
        );
      },
    },
    UserResponseRepository,
  ],
  exports: [UserResponseService],
})
export class UserResponseModule {} 