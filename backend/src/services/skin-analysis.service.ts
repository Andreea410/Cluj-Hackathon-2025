import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from './base.service';
import { SkinAnalysis } from '../models/skin-analysis.model';
import { SkinAnalysisRepository } from '../repositories/skin-analysis.repository';
import { AIMessage } from '../models/ai-message.model';
import { SkinInformation } from '../models/skin-information.model';
import { AgentLogService } from './agent-log.service';
import { AgentLog } from '../models/agent-log.model';

@Injectable()
export class SkinAnalysisService extends BaseService<SkinAnalysis> {
  private readonly logger = new Logger(SkinAnalysisService.name);

  constructor(private readonly skinAnalysisRepository: SkinAnalysisRepository, private readonly agentLogService: AgentLogService) {
    super(skinAnalysisRepository);
  }

  async findByUserId(userId: string): Promise<SkinAnalysis | null> {
    return this.skinAnalysisRepository.findByUserId(userId);
  }

  async startAnalysis(userId: string): Promise<SkinAnalysis> {
    const existingAnalysis = await this.findByUserId(userId);
    if (existingAnalysis) {
      return existingAnalysis;
    }

    const initialMessage: AIMessage = {
      role: 'assistant',
      content: 'Hello! I\'m here to help you understand your skin better. Let\'s start by discussing your skin concerns. What are the main issues you\'d like to address?'
    };

    const initialSkinInfo: SkinInformation = {
      skin_type: null,
      concerns: [],
      breakouts_frequency: null,
      allergies: [],
      current_products: []
    };

    const analysis = new SkinAnalysis({
      user_id: userId,
      messages: [initialMessage],
      skin_info: initialSkinInfo
    });

    return this.create(analysis);
  }

  async processUserResponse(userId: string, response: string): Promise<SkinAnalysis> {
    const analysis = await this.findByUserId(userId);
    if (!analysis) {
      throw new Error('No active skin analysis found for this user');
    }

    // Add user's response to messages
    analysis.messages.push({
      role: 'user',
      content: response
    });

    // Update skin information based on response
    this.updateSkinInfo(analysis, response);

    // Generate and add AI response
    const nextMessage = this.generateNextMessage(analysis);
    analysis.messages.push(nextMessage);

    // Update the analysis
    return this.update(analysis.id, analysis);
  }

  private updateSkinInfo(analysis: SkinAnalysis, response: string): void {
    // Implement logic to update skin information based on user response
    // This is a placeholder - implement actual logic based on your requirements
    const skinInfo = analysis.skin_info;
    
    // Example: Update skin type if mentioned
    if (response.toLowerCase().includes('oily')) {
      skinInfo.skin_type = 'oily';
    } else if (response.toLowerCase().includes('dry')) {
      skinInfo.skin_type = 'dry';
    } else if (response.toLowerCase().includes('combination')) {
      skinInfo.skin_type = 'combination';
    } else if (response.toLowerCase().includes('normal')) {
      skinInfo.skin_type = 'normal';
    }

    // Example: Update concerns if mentioned
    const concerns = ['acne', 'wrinkles', 'dark spots', 'redness', 'sensitivity'];
    concerns.forEach(concern => {
      if (response.toLowerCase().includes(concern) && !skinInfo.concerns.includes(concern)) {
        skinInfo.concerns.push(concern);
      }
    });

    // Example: Update breakouts frequency if mentioned
    if (response.toLowerCase().includes('rarely')) {
      skinInfo.breakouts_frequency = 'rare';
    } else if (response.toLowerCase().includes('sometimes')) {
      skinInfo.breakouts_frequency = 'occasional';
    } else if (response.toLowerCase().includes('often')) {
      skinInfo.breakouts_frequency = 'frequent';
    } else if (response.toLowerCase().includes('always')) {
      skinInfo.breakouts_frequency = 'constant';
    }
  }

  private generateNextMessage(analysis: SkinAnalysis): AIMessage {
    // Implement logic to generate the next AI message based on the conversation
    // This is a placeholder - implement actual logic based on your requirements
    const lastMessage = analysis.messages[analysis.messages.length - 1];
    const skinInfo = analysis.skin_info;

    let content = '';

    if (!skinInfo.skin_type) {
      content = 'Could you tell me more about your skin type? Is it oily, dry, combination, or normal?';
    } else if (skinInfo.concerns.length === 0) {
      content = 'What specific skin concerns would you like to address?';
    } else if (!skinInfo.breakouts_frequency) {
      content = 'How often do you experience breakouts?';
    } else {
      content = 'Thank you for sharing that information. Based on what you\'ve told me, I can help you develop a personalized skincare routine. Would you like to proceed with creating a routine?';
    }

    return {
      role: 'assistant',
      content
    };
  }

  async processResponse(userId: string, message: string): Promise<AgentLog> {
    // Log the user's message
    const userLog = new AgentLog({
      user_id: userId,
      role: 'user',
      message: {
        type: 'text',
        content: message
      }
    });
    await this.agentLogService.create(userLog);

    // Generate AI response based on the conversation context
    const response = await this.generateResponse(userId, message);

    // Log the AI response
    const aiLog = new AgentLog({
      user_id: userId,
      role: 'assistant',
      message: {
        type: 'text',
        content: response
      }
    });

    return this.agentLogService.create(aiLog);
  }

  async getHistory(userId: string): Promise<AgentLog[]> {
    return this.agentLogService.findByUserId(userId);
  }
} 