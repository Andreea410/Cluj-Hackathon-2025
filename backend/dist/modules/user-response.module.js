"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseModule = void 0;
const common_1 = require("@nestjs/common");
const user_response_service_1 = require("../services/user-response.service");
const user_response_controller_1 = require("../controllers/user-response.controller");
const user_response_repository_1 = require("../repositories/user-response.repository");
const supabase_js_1 = require("@supabase/supabase-js");
let UserResponseModule = class UserResponseModule {
};
exports.UserResponseModule = UserResponseModule;
exports.UserResponseModule = UserResponseModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_response_controller_1.UserResponseController],
        providers: [
            user_response_service_1.UserResponseService,
            {
                provide: supabase_js_1.SupabaseClient,
                useFactory: () => {
                    return new supabase_js_1.SupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
                },
            },
            user_response_repository_1.UserResponseRepository,
        ],
        exports: [user_response_service_1.UserResponseService],
    })
], UserResponseModule);
//# sourceMappingURL=user-response.module.js.map