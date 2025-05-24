"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const routine_template_controller_1 = require("../controllers/routine-template.controller");
const routine_template_service_1 = require("../services/routine-template.service");
const routine_template_repository_1 = require("../repositories/routine-template.repository");
let RoutineTemplateModule = class RoutineTemplateModule {
};
exports.RoutineTemplateModule = RoutineTemplateModule;
exports.RoutineTemplateModule = RoutineTemplateModule = __decorate([
    (0, common_1.Module)({
        controllers: [routine_template_controller_1.RoutineTemplateController],
        providers: [routine_template_service_1.RoutineTemplateService, routine_template_repository_1.RoutineTemplateRepository],
        exports: [routine_template_service_1.RoutineTemplateService]
    })
], RoutineTemplateModule);
//# sourceMappingURL=routine-template.module.js.map