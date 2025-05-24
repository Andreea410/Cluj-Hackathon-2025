"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineCompletionService = void 0;
const routine_completion_model_1 = require("../models/routine-completion.model");
const point_transaction_model_1 = require("../models/point-transaction.model");
class RoutineCompletionService {
    constructor(routineCompletionRepo, pointTransactionRepo) {
        this.routineCompletionRepo = routineCompletionRepo;
        this.pointTransactionRepo = pointTransactionRepo;
    }
    async completeRoutineStep(userId, isMorning, completed) {
        const today = new Date();
        let completion = await this.routineCompletionRepo.findByDate(userId, today);
        if (!completion) {
            completion = new routine_completion_model_1.RoutineCompletion({
                user_id: userId,
                date: today,
                morning_completed: false,
                night_completed: false,
                points_awarded: false
            });
            completion = await this.routineCompletionRepo.createCompletion(completion);
        }
        const updates = {
            morning_completed: isMorning ? completed : completion.morning_completed,
            night_completed: !isMorning ? completed : completion.night_completed
        };
        completion = await this.routineCompletionRepo.updateCompletion(userId, today, updates);
        if (completion.morning_completed && completion.night_completed && !completion.points_awarded) {
            await this.awardPoints(userId);
            completion = await this.routineCompletionRepo.updateCompletion(userId, today, {
                points_awarded: true
            });
        }
        return completion;
    }
    async awardPoints(userId) {
        const points = 10;
        const transaction = new point_transaction_model_1.PointTransaction({
            user_id: userId,
            points: points,
            description: 'Completed daily routines'
        });
        await this.pointTransactionRepo.create(transaction);
    }
    async getCompletionHistory(userId) {
        return this.routineCompletionRepo.findByUserId(userId);
    }
}
exports.RoutineCompletionService = RoutineCompletionService;
//# sourceMappingURL=routine-completion.service.js.map