import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { SupabaseClient } from '@supabase/supabase-js';
import { IUserRepository } from '../repositories/interfaces/user.repository.interface';

// Create a token for the repository
export const USER_REPOSITORY = 'USER_REPOSITORY';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
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
  exports: [UserService],
})
export class UserModule {} 