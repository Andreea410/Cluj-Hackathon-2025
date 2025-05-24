import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserRoutineService } from '../services/user-routine.service';
import { UserRoutine } from '../models/user-routine.model';

@Controller('user-routines')
export class UserRoutineController {
  constructor(private readonly userRoutineService: UserRoutineService) {}

  @Post('assign')
  async assignRoutine(@Body() userRoutine: UserRoutine): Promise<UserRoutine> {
    try {
      return await this.userRoutineService.assignRoutine(userRoutine);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk-assign/:userId')
  async bulkAssignRoutines(
    @Param('userId') userId: string,
    @Body() data: { routineTemplateIds: string[] }
  ): Promise<UserRoutine[]> {
    try {
      return await this.userRoutineService.bulkAssignRoutines(userId, data.routineTemplateIds);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserRoutine(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<UserRoutine> {
    try {
      if (includeRelations) {
        const routine = await this.userRoutineService.findWithRelations(id);
        if (!routine) throw new Error('User routine not found');
        return routine;
      }
      const routine = await this.userRoutineService.findById(id);
      if (!routine) throw new Error('User routine not found');
      return routine;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllUserRoutines(
    @Query('userId') userId?: string,
    @Query('routineTemplateId') routineTemplateId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('includeRelations') includeRelations?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ): Promise<UserRoutine[]> {
    try {
      if (startDate && endDate) {
        return await this.userRoutineService.findAllAssignedBetweenDates(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (userId && routineTemplateId) {
        const routine = await this.userRoutineService.findByUserAndTemplate(userId, routineTemplateId);
        return routine ? [routine] : [];
      }
      if (userId) {
        return await this.userRoutineService.findAllByUserWithDetails(userId);
      }
      if (routineTemplateId) {
        return await this.userRoutineService.findAllByTemplateWithDetails(routineTemplateId);
      }
      if (authUserId) {
        return await this.userRoutineService.findByAuthUserId(authUserId);
      }
      if (includeRelations) {
        return await this.userRoutineService.findAllWithRelations();
      }
      return await this.userRoutineService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('statistics/template/:routineTemplateId')
  async getRoutineStatistics(@Param('routineTemplateId') routineTemplateId: string) {
    try {
      return await this.userRoutineService.getRoutineStatistics(routineTemplateId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('check/:userId/:routineTemplateId')
  async checkRoutineAssigned(
    @Param('userId') userId: string,
    @Param('routineTemplateId') routineTemplateId: string
  ): Promise<{ assigned: boolean }> {
    try {
      const assigned = await this.userRoutineService.hasUserAssignedRoutine(userId, routineTemplateId);
      return { assigned };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('active/:userId')
  async getActiveRoutines(@Param('userId') userId: string): Promise<UserRoutine[]> {
    try {
      return await this.userRoutineService.getActiveRoutines(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async reassignRoutine(
    @Param('id') id: string,
    @Body() userRoutine: UserRoutine
  ): Promise<UserRoutine> {
    try {
      return await this.userRoutineService.reassignRoutine(id, userRoutine);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUserRoutine(@Param('id') id: string): Promise<void> {
    try {
      await this.userRoutineService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 