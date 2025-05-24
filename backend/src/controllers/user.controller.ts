import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Query('includeRole') includeRole?: boolean
  ): Promise<User> {
    try {
      if (includeRole) {
        const user = await this.userService.findWithRole(id);
        if (!user) throw new Error('User not found');
        return user;
      }
      return await this.userService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllUsers(
    @Query('roleId') roleId?: string,
    @Query('includeRoles') includeRoles?: boolean
  ): Promise<User[]> {
    try {
      if (roleId) {
        return await this.userService.findByRoleId(roleId);
      }
      if (includeRoles) {
        return await this.userService.findAllWithRoles();
      }
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Partial<User>
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('validate')
  async validateUser(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<User | null> {
    try {
      const user = await this.userService.validatePassword(email, password);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
} 