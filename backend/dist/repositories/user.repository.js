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
const role_model_1 = require("../models/role.model");
let UserRepository = class UserRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'users', user_model_1.User);
    }
    async findByEmail(email) {
        try {
            console.log(`Finding user by email: ${email}`);
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*')
                .eq('email', email)
                .maybeSingle();
            if (error) {
                console.error('Error finding user by email:', error);
                throw new database_error_1.DatabaseError(error.message);
            }
            console.log('User lookup result:', data ? 'User found' : 'No user found');
            return data ? user_model_1.User.fromJSON(data) : null;
        }
        catch (error) {
            console.error('Error in findByEmail:', error);
            throw new database_error_1.DatabaseError(`Failed to find user by email: ${error.message}`);
        }
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
        role:roles(*)
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
        role:roles(*)
      `);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => user_model_1.User.fromJSON(item));
    }
    async findRoleByName(name) {
        try {
            console.log(`Finding role by name: ${name}`);
            const { data, error } = await this.supabase
                .from('roles')
                .select('*')
                .eq('name', name)
                .single();
            if (error) {
                console.error('Error finding role:', error);
                if (error.code === 'PGRST116') {
                    return null;
                }
                throw new database_error_1.DatabaseError(error.message);
            }
            console.log('Found role:', data);
            return data ? role_model_1.Role.fromJSON(data) : null;
        }
        catch (error) {
            console.error('Error in findRoleByName:', error);
            throw new database_error_1.DatabaseError(`Failed to find role: ${error.message}`);
        }
    }
    async createRole(role) {
        try {
            console.log('Creating role:', role.toJSON());
            const { data, error } = await this.supabase
                .from('roles')
                .insert(role.toJSON())
                .select()
                .single();
            if (error) {
                console.error('Error creating role:', error);
                throw new database_error_1.DatabaseError(`Failed to create role: ${error.message}`);
            }
            if (!data) {
                console.error('No data returned after role creation');
                throw new database_error_1.DatabaseError('No data returned after role creation');
            }
            console.log('Created role:', data);
            return role_model_1.Role.fromJSON(data);
        }
        catch (error) {
            console.error('Error in createRole:', error);
            throw new database_error_1.DatabaseError(`Failed to create role: ${error.message}`);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UserRepository);
//# sourceMappingURL=user.repository.js.map