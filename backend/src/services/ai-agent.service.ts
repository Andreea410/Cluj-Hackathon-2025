import { Injectable } from '@nestjs/common';
import { SkinProfile } from '../models/skin-profile.model';
import { SkincareRoutine, RoutineStep } from '../models/skincare-routine.model';
import { PhotoAnalysis } from '../models/photo-analysis.model';
import { AgentLogService } from './agent-log.service';
import { AgentLog } from '../models/agent-log.model';

@Injectable()
export class AIAgentService {
  constructor(private readonly agentLogService: AgentLogService) {}

  async analyzeSkinProfile(profile: SkinProfile): Promise<SkincareRoutine> {
    // Log the analysis request
    const analysisLog = new AgentLog({
      user_id: profile.user_id,
      role: 'assistant',
      message: {
        type: 'skin_analysis',
        profile: profile.toJSON()
      }
    });
    await this.agentLogService.create(analysisLog);

    // Generate routine based on skin profile
    const routine = await this.generateRoutine(profile);

    // Log the generated routine
    const routineLog = new AgentLog({
      user_id: profile.user_id,
      role: 'assistant',
      message: {
        type: 'routine_generation',
        routine: routine.toJSON()
      }
    });
    await this.agentLogService.create(routineLog);

    return routine;
  }

  async analyzeProgress(photoAnalyses: PhotoAnalysis[]): Promise<{
    improvements: string[];
    recommendations: string[];
  }> {
    // Sort analyses by date
    const sortedAnalyses = photoAnalyses.sort(
      (a, b) => a.analyzed_at.getTime() - b.analyzed_at.getTime()
    );

    // Compare metrics over time
    const improvements = this.compareMetrics(sortedAnalyses);
    const recommendations = this.generateRecommendations(improvements);

    return {
      improvements,
      recommendations
    };
  }

  private async generateRoutine(profile: SkinProfile): Promise<SkincareRoutine> {
    const morningSteps: RoutineStep[] = [];
    const eveningSteps: RoutineStep[] = [];

    // Generate morning routine
    if (profile.skin_type.type === 'dry') {
      morningSteps.push({
        product_id: 'cleanser-hydrating',
        order: 1,
        time_of_day: 'morning',
        instructions: 'Gently cleanse with lukewarm water',
        completed: false
      });
      morningSteps.push({
        product_id: 'hydrating-serum',
        order: 2,
        time_of_day: 'morning',
        instructions: 'Apply 2-3 drops of hydrating serum',
        completed: false
      });
    } else if (profile.skin_type.type === 'oily') {
      morningSteps.push({
        product_id: 'cleanser-oil-control',
        order: 1,
        time_of_day: 'morning',
        instructions: 'Cleanse with oil-control cleanser',
        completed: false
      });
      morningSteps.push({
        product_id: 'oil-free-moisturizer',
        order: 2,
        time_of_day: 'morning',
        instructions: 'Apply oil-free moisturizer',
        completed: false
      });
    }

    // Add sunscreen for all skin types
    morningSteps.push({
      product_id: 'broad-spectrum-spf',
      order: morningSteps.length + 1,
      time_of_day: 'morning',
      instructions: 'Apply broad-spectrum SPF 30+',
      completed: false
    });

    // Generate evening routine
    eveningSteps.push({
      product_id: 'double-cleanser',
      order: 1,
      time_of_day: 'evening',
      instructions: 'Double cleanse to remove makeup and impurities',
      completed: false
    });

    // Add treatment products based on concerns
    profile.concerns.forEach((concern, index) => {
      if (concern.type === 'acne') {
        eveningSteps.push({
          product_id: 'acne-treatment',
          order: eveningSteps.length + 1,
          time_of_day: 'evening',
          instructions: 'Apply acne treatment to affected areas',
          completed: false
        });
      } else if (concern.type === 'aging') {
        eveningSteps.push({
          product_id: 'retinol',
          order: eveningSteps.length + 1,
          time_of_day: 'evening',
          instructions: 'Apply retinol treatment',
          completed: false
        });
      }
    });

    // Add moisturizer
    eveningSteps.push({
      product_id: 'night-moisturizer',
      order: eveningSteps.length + 1,
      time_of_day: 'evening',
      instructions: 'Apply night moisturizer',
      completed: false
    });

    return new SkincareRoutine({
      user_id: profile.user_id,
      name: 'Personalized Skincare Routine',
      steps: [...morningSteps, ...eveningSteps],
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
      points_earned: 0
    });
  }

  private compareMetrics(analyses: PhotoAnalysis[]): string[] {
    const improvements: string[] = [];
    
    // Compare consecutive analyses
    for (let i = 1; i < analyses.length; i++) {
      const current = analyses[i].metrics;
      const previous = analyses[i - 1].metrics;

      // Compare specific metrics
      if (current.hydration > previous.hydration) {
        improvements.push('Improved skin hydration');
      }
      if (current.evenness > previous.evenness) {
        improvements.push('Improved skin tone evenness');
      }
      if (current.texture < previous.texture) {
        improvements.push('Improved skin texture');
      }
    }

    return improvements;
  }

  private generateRecommendations(improvements: string[]): string[] {
    const recommendations: string[] = [];

    if (improvements.includes('Improved skin hydration')) {
      recommendations.push('Continue using hydrating products');
    } else {
      recommendations.push('Consider adding more hydrating products to your routine');
    }

    if (improvements.includes('Improved skin tone evenness')) {
      recommendations.push('Maintain current brightening routine');
    } else {
      recommendations.push('Consider adding vitamin C or niacinamide to your routine');
    }

    if (improvements.includes('Improved skin texture')) {
      recommendations.push('Continue with current exfoliation routine');
    } else {
      recommendations.push('Consider adding gentle exfoliation to your routine');
    }

    return recommendations;
  }
} 