import { Module } from '@nestjs/common';
import { DiaryEntryController } from '../controllers/diary-entry.controller';
import { DiaryEntryService } from '../services/diary-entry.service';
import { DiaryEntryRepository } from '../repositories/diary-entry.repository';

@Module({
  controllers: [DiaryEntryController],
  providers: [DiaryEntryService, DiaryEntryRepository],
  exports: [DiaryEntryService]
})
export class DiaryEntryModule {} 