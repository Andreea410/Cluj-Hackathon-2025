import { Module } from '@nestjs/common';
import { RoutineTemplateController } from '../controllers/routine-template.controller';
import { RoutineTemplateService } from '../services/routine-template.service';
import { RoutineTemplateRepository } from '../repositories/routine-template.repository';

@Module({
  controllers: [RoutineTemplateController],
  providers: [RoutineTemplateService, RoutineTemplateRepository],
  exports: [RoutineTemplateService]
})
export class RoutineTemplateModule {} 