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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const user_model_1 = require("../models/user.model");
const database_error_1 = require("../shared/exceptions/database.error");
let UserRepository = class UserRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'users', user_model_1.User);
    }
    async findByEmail(email) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('email', email)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_model_1.User.fromJSON(data) : null;
    }
    async findByRoleId(roleId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('role_id', roleId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_model_1.User.fromJSON(item));
    }
    async findWithRole(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        role:role_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? user_model_1.User.fromJSON(data) : null;
    }
    async findAllWithRoles() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        role:role_id (*)
      `);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_model_1.User.fromJSON(item));
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UserRepository);
//# sourceMappingURL=user.repository.js.map