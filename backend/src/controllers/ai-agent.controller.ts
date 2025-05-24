import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AIAgentService } from '../services/ai-agent.service';
import { SkinProfile } from '../models/skin-profile.model';
import { PhotoAnalysis } from '../models/photo-analysis.model';

@Controller('ai-agent')
export class AIAgentController {
  constructor(private readonly aiAgentService: AIAgentService) {}

  @Post('analyze-profile')
  async analyzeSkinProfile(@Body() profile: SkinProfile) {
    try {
      return await this.aiAgentService.analyzeSkinProfile(profile);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('analyze-progress')
  async analyzeProgress(@Body() analyses: PhotoAnalysis[]) {
    try {
      return await this.aiAgentService.analyzeProgress(analyses);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
} 