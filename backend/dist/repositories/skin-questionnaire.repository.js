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
exports.SkinQuestionnaireRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const skin_questionnaire_model_1 = require("../models/skin-questionnaire.model");
let SkinQuestionnaireRepository = class SkinQuestionnaireRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'user_responses', skin_questionnaire_model_1.SkinQuestionnaire);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId);
        if (error)
            throw error;
        return data.map(item => skin_questionnaire_model_1.SkinQuestionnaire.fromJSON(item));
    }
};
exports.SkinQuestionnaireRepository = SkinQuestionnaireRepository;
exports.SkinQuestionnaireRepository = SkinQuestionnaireRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], SkinQuestionnaireRepository);
//# sourceMappingURL=skin-questionnaire.repository.js.map