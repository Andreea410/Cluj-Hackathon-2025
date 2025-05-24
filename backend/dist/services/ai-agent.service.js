"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAgentService = void 0;
const common_1 = require("@nestjs/common");
const skincare_routine_model_1 = require("../models/skincare-routine.model");
const agent_log_service_1 = require("./agent-log.service");
const agent_log_model_1 = require("../models/agent-log.model");
let AIAgentService = class AIAgentService {
    constructor(agentLogService) {
        this.agentLogService = agentLogService;
    }
    async analyzeSkinProfile(profile) {
        const analysisLog = new agent_log_model_1.AgentLog({
            user_id: profile.user_id,
            role: 'assistant',
            message: {
                type: 'skin_analysis',
                profile: profile.toJSON()
            }
        });
        await this.agentLogService.create(analysisLog);
        const routine = await this.generateRoutine(profile);
        const routineLog = new agent_log_model_1.AgentLog({
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
    async analyzeProgress(photoAnalyses) {
        const sortedAnalyses = photoAnalyses.sort((a, b) => a.analyzed_at.getTime() - b.analyzed_at.getTime());
        const improvements = this.compareMetrics(sortedAnalyses);
        const recommendations = this.generateRecommendations(improvements);
        return {
            improvements,
            recommendations
        };
    }
    async generateRoutine(profile) {
        const morningSteps = [];
        const eveningSteps = [];
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
        }
        else if (profile.skin_type.type === 'oily') {
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
        morningSteps.push({
            product_id: 'broad-spectrum-spf',
            order: morningSteps.length + 1,
            time_of_day: 'morning',
            instructions: 'Apply broad-spectrum SPF 30+',
            completed: false
        });
        eveningSteps.push({
            product_id: 'double-cleanser',
            order: 1,
            time_of_day: 'evening',
            instructions: 'Double cleanse to remove makeup and impurities',
            completed: false
        });
        profile.concerns.forEach((concern, index) => {
            if (concern.type === 'acne') {
                eveningSteps.push({
                    product_id: 'acne-treatment',
                    order: eveningSteps.length + 1,
                    time_of_day: 'evening',
                    instructions: 'Apply acne treatment to affected areas',
                    completed: false
                });
            }
            else if (concern.type === 'aging') {
                eveningSteps.push({
                    product_id: 'retinol',
                    order: eveningSteps.length + 1,
                    time_of_day: 'evening',
                    instructions: 'Apply retinol treatment',
                    completed: false
                });
            }
        });
        eveningSteps.push({
            product_id: 'night-moisturizer',
            order: eveningSteps.length + 1,
            time_of_day: 'evening',
            instructions: 'Apply night moisturizer',
            completed: false
        });
        return new skincare_routine_model_1.SkincareRoutine({
            user_id: profile.user_id,
            name: 'Personalized Skincare Routine',
            steps: [...morningSteps, ...eveningSteps],
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true,
            points_earned: 0
        });
    }
    compareMetrics(analyses) {
        const improvements = [];
        for (let i = 1; i < analyses.length; i++) {
            const current = analyses[i].metrics;
            const previous = analyses[i - 1].metrics;
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
    generateRecommendations(improvements) {
        const recommendations = [];
        if (improvements.includes('Improved skin hydration')) {
            recommendations.push('Continue using hydrating products');
        }
        else {
            recommendations.push('Consider adding more hydrating products to your routine');
        }
        if (improvements.includes('Improved skin tone evenness')) {
            recommendations.push('Maintain current brightening routine');
        }
        else {
            recommendations.push('Consider adding vitamin C or niacinamide to your routine');
        }
        if (improvements.includes('Improved skin texture')) {
            recommendations.push('Continue with current exfoliation routine');
        }
        else {
            recommendations.push('Consider adding gentle exfoliation to your routine');
        }
        return recommendations;
    }
};
exports.AIAgentService = AIAgentService;
exports.AIAgentService = AIAgentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [agent_log_service_1.AgentLogService])
], AIAgentService);
//# sourceMappingURL=ai-agent.service.js.map