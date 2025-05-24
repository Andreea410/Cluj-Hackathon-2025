import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { SupabaseClient } from '@supabase/supabase-js';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(SupabaseClient) private readonly supabase: SupabaseClient
  ) {}

  @Post()
  async createUser(@Body() user: Partial<User> & { password: string }): Promise<User> {
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

  @Get(':id/morning-products')
  async getMorningRoutineProducts(@Param('id') userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('user_routines')
        .select(`
          id,
          routine_templates (
            id,
            name,
            routine_template_products (
              id,
              product_id,
              products (
                id,
                name,
                photo_url
              )
            )
          )
        `)
        .eq('user_id', userId)
        .eq('routine_templates.name', 'Morning');

      if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

      const routines = Array.isArray(data) ? data : [];
      const products = routines
        .flatMap(routine => {
          const templates = Array.isArray(routine?.routine_templates) ? routine.routine_templates : [routine?.routine_templates];
          return templates.flatMap(template => template?.routine_template_products || []);
        })
        .map(rtp => rtp.products)
        .filter(Boolean);

      if (!products.length) {
        throw new HttpException('Please complete your profile in order to get a routine', HttpStatus.NOT_FOUND);
      }
      return products;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException('Please complete your profile in order to get a routine', HttpStatus.NOT_FOUND);
    }
  }
} 