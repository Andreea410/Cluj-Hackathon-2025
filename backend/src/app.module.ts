import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { PaymentModule } from './modules/payment.module';
import { UserResponseModule } from './modules/user-response.module';
import { AnswerOptionModule } from './modules/answer-option.module';
import { PointTransactionModule } from './modules/point-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PaymentModule,
    UserResponseModule,
    AnswerOptionModule,
    PointTransactionModule,
  ],
})
export class AppModule {} 