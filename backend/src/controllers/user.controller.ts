import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus, Inject, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';

interface Product {
  id: string;
  name: string;
  photo_url: string;
  time: string;
}

interface RoutineTemplateProduct {
  id: string;
  routine_template_id: string;
  product_id: string;
  products: Product[];
}

interface RoutineTemplate {
  id: string;
  name: string;
  description: string;
}

interface UserRoutine {
  id: string;
  routine_template_id: string;
  routine_templates: RoutineTemplate[];
}

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(SupabaseClient) private readonly supabase: SupabaseClient
  ) {
    console.log('UserController initialized');
  }
  
  @Get('ping')
  ping() {
    console.log('Ping route hit!');
    return { message: 'pong' };
  }

  @Get('test')
  testRoute() {
    console.log('Test route hit!');
    return { message: 'Test route hit!' };
  }

  @Get(':id/morning-products')
  async getMorningRoutineProducts(@Param('id') userId: string, @Req() request: Request) {
    console.log('=== [START] getMorningRoutineProducts ===');
    console.log('[STEP 1] Received request for user ID:', userId);
    console.log('[STEP 2] Timestamp:', new Date().toISOString());
    try {
      console.log('[STEP 3] Checking if user exists...');
      const { data: user, error: userError } = await this.supabase
        .from('users')
        .select('id, email')
        .eq('id', userId)
        .single();
      console.log('[STEP 3.1] User query result:', { user, userError });
      if (userError) {
        console.error('[ERROR] User not found:', userError);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (!user) {
        console.log('[STEP 3.2] User not found in database');
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      // Step 4: Check user_routines table
      console.log('[STEP 4] Checking user_routines for user...');
      const { data: userRoutines, error: userRoutinesError } = await this.supabase
        .from('user_routines')
        .select('id, user_id, routine_template_id')
        .eq('user_id', userId);
      console.log('[STEP 4.1] user_routines query result:', { userRoutines, userRoutinesError });
      if (userRoutinesError) {
        console.error('[ERROR] Error checking user_routines:', userRoutinesError);
        throw new HttpException('Failed to check user routines', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (!userRoutines || userRoutines.length === 0) {
        console.log('[STEP 4.2] No routines found in user_routines table for user:', userId);
        throw new HttpException('Please complete your profile in order to get a routine', HttpStatus.NOT_FOUND);
      }
      // Step 5: Get the user's routine template with more details
      console.log('[STEP 5] Getting user routine template details...');
      const { data: userRoutine, error: userRoutineError } = await this.supabase
        .from('user_routines')
        .select('id, routine_template_id, routine_templates (id, name, description)')
        .eq('user_id', userId)
        .single();
      console.log('[STEP 5.1] userRoutine query result:', { userRoutine, userRoutineError });
      if (userRoutineError) {
        console.error('[ERROR] Error fetching user routine:', userRoutineError);
        throw new HttpException('Failed to fetch user routine', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (!userRoutine) {
        console.log('[STEP 5.2] No routine found for user:', userId);
        throw new HttpException('Please complete your profile in order to get a routine', HttpStatus.NOT_FOUND);
      }
      // Step 6: Get the products for this routine template
      console.log('[STEP 6] Getting products for template:', userRoutine.routine_template_id);
      const { data: products, error: productsError } = await this.supabase
        .from('routine_template_products')
        .select('id, routine_template_id, product_id, products (id, name, photo_url)')
        .eq('routine_template_id', userRoutine.routine_template_id);
      console.log('[STEP 6.1] Raw products response:', products);
      if (productsError) {
        console.error('[ERROR] Error fetching products:', productsError);
        throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (!products || products.length === 0) {
        console.log('[STEP 6.2] No products found for routine template:', userRoutine.routine_template_id);
        throw new HttpException('Please complete your profile in order to get a routine', HttpStatus.NOT_FOUND);
      }
      // Step 7: Transform the data to match the expected format
      console.log('[STEP 7] Formatting products...');
      const formattedProducts = products
        .map(item => Array.isArray(item.products) ? item.products[0] : item.products)
        .filter(Boolean);
      console.log('[STEP 7.1] Formatted products:', formattedProducts);
      console.log('=== [END] getMorningRoutineProducts ===');
      return formattedProducts;
    } catch (err) {
      console.error('[ERROR] in getMorningRoutineProducts:', err);
      if (err instanceof HttpException) throw err;
      throw new HttpException('Please complete your profile in order to get a routine', HttpStatus.NOT_FOUND);
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