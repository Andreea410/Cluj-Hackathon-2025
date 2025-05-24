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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const user_model_1 = require("../models/user.model");
const user_repository_1 = require("../repositories/user.repository");
const role_model_1 = require("../models/role.model");
const bcrypt = require("bcrypt");
let UserService = UserService_1 = class UserService extends base_service_1.BaseService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    validateUserData(userData) {
        if (!userData.email) {
            throw new common_1.BadRequestException('Email is required');
        }
        if (!userData.password) {
            throw new common_1.BadRequestException('Password is required');
        }
        if (!userData.first_name) {
            throw new common_1.BadRequestException('First name is required');
        }
        if (!userData.last_name) {
            throw new common_1.BadRequestException('Last name is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        if (userData.password.length < 8) {
            throw new common_1.BadRequestException('Password must be at least 8 characters long');
        }
    }
    async ensureDefaultRole() {
        try {
            this.logger.debug('Checking for default user role...');
            this.logger.debug('Attempting to find role by name: user');
            const defaultRole = await this.userRepository.findRoleByName('user');
            if (defaultRole) {
                this.logger.debug(`Found existing default role with ID: ${defaultRole.id}`);
                return defaultRole.id;
            }
            this.logger.debug('Default role not found, creating new role...');
            const newRole = new role_model_1.Role({
                name: 'user',
                permissions: ['read:own_profile', 'write:own_profile']
            });
            this.logger.debug(`Attempting to create new role: ${JSON.stringify(newRole.toJSON())}`);
            try {
                const createdRole = await this.userRepository.createRole(newRole);
                this.logger.debug('Role creation response:', createdRole);
                if (!createdRole || !createdRole.id) {
                    this.logger.error('Role creation succeeded but no role ID was returned');
                    throw new Error('Role creation succeeded but no role ID was returned');
                }
                this.logger.debug(`Successfully created new role with ID: ${createdRole.id}`);
                return createdRole.id;
            }
            catch (createError) {
                this.logger.error('Error creating role:', createError);
                this.logger.debug('Retrying to find role after creation error...');
                const retryRole = await this.userRepository.findRoleByName('user');
                if (retryRole && retryRole.id) {
                    this.logger.debug(`Found role on retry with ID: ${retryRole.id}`);
                    return retryRole.id;
                }
                throw new common_1.BadRequestException(`Failed to create or find user role: ${createError.message}`);
            }
        }
        catch (error) {
            this.logger.error('Error in ensureDefaultRole:', error);
            throw new common_1.BadRequestException(`Failed to set up user role: ${error.message}`);
        }
    }
    async createUser(userData) {
        try {
            const { role_id, ...cleanUserData } = userData;
            this.logger.debug(`Creating user with data: ${JSON.stringify({ ...cleanUserData, password: '[REDACTED]' })}`);
            this.validateUserData(cleanUserData);
            this.logger.debug('User data validation passed');
            const existingUser = await this.userRepository.findByEmail(cleanUserData.email);
            if (existingUser) {
                this.logger.warn(`User with email ${cleanUserData.email} already exists`);
                throw new common_1.BadRequestException('A user with this email already exists');
            }
            this.logger.debug('No existing user found with this email');
            this.logger.debug('Getting or creating default role...');
            const roleId = await this.ensureDefaultRole();
            if (!roleId) {
                throw new common_1.BadRequestException('Failed to get or create user role');
            }
            this.logger.debug(`Using role ID: ${roleId}`);
            this.logger.debug('Hashing password...');
            const salt = await bcrypt.genSalt();
            const hashed_password = await bcrypt.hash(cleanUserData.password, salt);
            this.logger.debug('Password hashed successfully');
            this.logger.debug('Creating user instance...');
            const user = new user_model_1.User({
                email: cleanUserData.email,
                password: cleanUserData.password,
                hashed_password,
                first_name: cleanUserData.first_name,
                last_name: cleanUserData.last_name,
                role_id: roleId
            });
            this.logger.debug(`Created user instance: ${JSON.stringify(user.toJSON())}`);
            this.logger.debug('Saving user to database...');
            const createdUser = await this.create(user);
            if (!createdUser || !createdUser.id) {
                this.logger.error('User creation succeeded but no user ID was returned');
                throw new Error('User creation succeeded but no user ID was returned');
            }
            this.logger.debug(`User created successfully with ID: ${createdUser.id}`);
            return createdUser;
        }
        catch (error) {
            this.logger.error('Error creating user:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Failed to create user: ${error.message}`);
        }
    }
    async updateUser(id, user) {
        if (user.email) {
            const existingUser = await this.userRepository.findByEmail(user.email);
            if (existingUser && existingUser.id !== id) {
                throw new common_1.BadRequestException('A user with this email already exists');
            }
        }
        if (user.password) {
            const salt = await bcrypt.genSalt();
            user.hashed_password = await bcrypt.hash(user.password, salt);
            delete user.password;
        }
        return this.update(id, user);
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async findByRoleId(roleId) {
        return this.userRepository.findByRoleId(roleId);
    }
    async findWithRole(id) {
        return this.userRepository.findWithRole(id);
    }
    async findAllWithRoles() {
        return this.userRepository.findAllWithRoles();
    }
    async validatePassword(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return null;
        const isValid = await bcrypt.compare(password, user.hashed_password);
        return isValid ? user : null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map