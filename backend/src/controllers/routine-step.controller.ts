import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RoutineStepService } from '../services/routine-step.service';
import { RoutineStep } from '../models/routine-step.model';

@Controller('routine-steps')
export class RoutineStepController {
  constructor(private readonly routineStepService: RoutineStepService) {}

  @Post()
  async createRoutineStep(@Body() routineStep: RoutineStep): Promise<RoutineStep> {
    try {
      return await this.routineStepService.createRoutineStep(routineStep);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('template/:templateId/bulk')
  async bulkCreateRoutineSteps(
    @Param('templateId') templateId: string,
    @Body() data: { steps: Array<Omit<RoutineStep, 'id' | 'routine_template_id'>> }
  ): Promise<RoutineStep[]> {
    try {
      return await this.routineStepService.bulkCreateRoutineSteps(templateId, data.steps);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getRoutineStep(
    @Param('id') id: string,
    @Query('includeTemplate') includeTemplate?: boolean
  ): Promise<RoutineStep> {
    try {
      if (includeTemplate) {
        const step = await this.routineStepService.findWithTemplate(id);
        if (!step) throw new Error('Routine step not found');
        return step;
      }
      const step = await this.routineStepService.findById(id);
      if (!step) throw new Error('Routine step not found');
      return step;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllRoutineSteps(
    @Query('templateId') templateId?: string,
    @Query('stepNumber') stepNumber?: number,
    @Query('includeTemplate') includeTemplate?: boolean
  ): Promise<RoutineStep[]> {
    try {
      if (templateId && stepNumber) {
        const step = await this.routineStepService.findByStepNumber(templateId, stepNumber);
        return step ? [step] : [];
      }
      if (templateId && includeTemplate) {
        return await this.routineStepService.findAllByTemplateWithDetails(templateId);
      }
      if (templateId) {
        return await this.routineStepService.findByRoutineTemplateId(templateId);
      }
      if (includeTemplate) {
        return await this.routineStepService.findAllWithTemplate();
      }
      return await this.routineStepService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateRoutineStep(
    @Param('id') id: string,
    @Body() routineStep: Partial<RoutineStep>
  ): Promise<RoutineStep> {
    try {
      return await this.routineStepService.updateRoutineStep(id, routineStep);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRoutineStep(@Param('id') id: string): Promise<void> {
    try {
      await this.routineStepService.deleteRoutineStep(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 