"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineCompletionController = void 0;
const http_error_1 = require("../errors/http.error");
class RoutineCompletionController {
    constructor(routineCompletionService) {
        this.routineCompletionService = routineCompletionService;
    }
    async completeRoutineStep(req, res) {
        try {
            const { userId } = req.user;
            const { isMorning, completed } = req.body;
            if (typeof isMorning !== 'boolean' || typeof completed !== 'boolean') {
                throw new http_error_1.HttpError(400, 'Invalid request body');
            }
            const completion = await this.routineCompletionService.completeRoutineStep(userId, isMorning, completed);
            res.json(completion);
        }
        catch (error) {
            if (error instanceof http_error_1.HttpError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getCompletionHistory(req, res) {
        try {
            const { userId } = req.user;
            const history = await this.routineCompletionService.getCompletionHistory(userId);
            res.json(history);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.RoutineCompletionController = RoutineCompletionController;
//# sourceMappingURL=routine-completion.controller.js.map