import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { Plan } from '../models/plan.model';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async createPlan(@Body() plan: Plan): Promise<Plan> {
    try {
      return await this.planService.createPlan(plan);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getPlan(@Param('id') id: string): Promise<Plan> {
    try {
      return await this.planService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllPlans(
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number
  ): Promise<Plan[]> {
    try {
      if (minPrice !== undefined && maxPrice !== undefined) {
        return await this.planService.findByPriceRange(minPrice, maxPrice);
      }
      return await this.planService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updatePlan(
    @Param('id') id: string,
    @Body() plan: Partial<Plan>
  ): Promise<Plan> {
    try {
      return await this.planService.updatePlan(id, plan);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePlan(@Param('id') id: string): Promise<void> {
    try {
      await this.planService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 