import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { SkinAnalysisService } from '../services/skin-analysis.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('skin-analysis')
@UseGuards(JwtAuthGuard)
export class SkinAnalysisController {
  constructor(private readonly skinAnalysisService: SkinAnalysisService) {}

  @Post('start')
  async startAnalysis(@User('id') userId: string) {
    return this.skinAnalysisService.startAnalysis(userId);
  }

  @Post('respond')
  async processResponse(
    @User('id') userId: string,
    @Body('message') message: string
  ) {
    return this.skinAnalysisService.processResponse(userId, message);
  }

  @Get('history')
  async getHistory(@User('id') userId: string) {
    return this.skinAnalysisService.getHistory(userId);
  }
} 