"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerOptionModule = void 0;
const common_1 = require("@nestjs/common");
const answer_option_controller_1 = require("../controllers/answer-option.controller");
const answer_option_service_1 = require("../services/answer-option.service");
const answer_option_repository_1 = require("../repositories/answer-option.repository");
const supabase_js_1 = require("@supabase/supabase-js");
let AnswerOptionModule = class AnswerOptionModule {
};
exports.AnswerOptionModule = AnswerOptionModule;
exports.AnswerOptionModule = AnswerOptionModule = __decorate([
    (0, common_1.Module)({
        controllers: [answer_option_controller_1.AnswerOptionController],
        providers: [
            answer_option_service_1.AnswerOptionService,
            answer_option_repository_1.AnswerOptionRepository,
            {
                provide: supabase_js_1.SupabaseClient,
                useFactory: () => {
                    return new supabase_js_1.SupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
                },
            },
        ],
        exports: [answer_option_service_1.AnswerOptionService]
    })
], AnswerOptionModule);
//# sourceMappingURL=answer-option.module.js.map