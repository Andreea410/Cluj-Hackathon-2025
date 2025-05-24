"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = exports.USER_REPOSITORY = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const user_controller_1 = require("../controllers/user.controller");
const user_repository_1 = require("../repositories/user.repository");
const supabase_js_1 = require("@supabase/supabase-js");
exports.USER_REPOSITORY = 'USER_REPOSITORY';
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            {
                provide: supabase_js_1.SupabaseClient,
                useFactory: () => {
                    return new supabase_js_1.SupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
                },
            },
        ],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map