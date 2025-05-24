import { Module } from '@nestjs/common';
import { SideEffectController } from '../controllers/side-effect.controller';
import { SideEffectService } from '../services/side-effect.service';
import { SideEffectRepository } from '../repositories/side-effect.repository';

@Module({
  controllers: [SideEffectController],
  providers: [SideEffectService, SideEffectRepository],
  exports: [SideEffectService]
})
export class SideEffectModule {} 