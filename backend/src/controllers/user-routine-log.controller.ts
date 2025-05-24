import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserRoutineLogService } from '../services/user-routine-log.service';
import { UserRoutineLog } from '../models/user-routine-log.model';

@Controller('user-routine-logs')
export class UserRoutineLogController {
  constructor(private readonly userRoutineLogService: UserRoutineLogService) {}

  @Post('log')
  async logRoutineProgress(@Body() userRoutineLog: UserRoutineLog): Promise<UserRoutineLog> {
    try {
      return await this.userRoutineLogService.logRoutineProgress(userRoutineLog);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk-log/:userRoutineId')
  async bulkCreateLogs(
    @Param('userRoutineId') userRoutineId: string,
    @Body() data: { logs: Array<{ logDate: string; completedSteps: number }> }
  ): Promise<UserRoutineLog[]> {
    try {
      const formattedLogs = data.logs.map(log => ({
        logDate: new Date(log.logDate),
        completedSteps: log.completedSteps
      }));
      return await this.userRoutineLogService.bulkCreateLogs(userRoutineId, formattedLogs);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getRoutineLog(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<UserRoutineLog> {
    try {
      if (includeRelations) {
        const log = await this.userRoutineLogService.findWithRelations(id);
        if (!log) throw new Error('User routine log not found');
        return log;
      }
      const log = await this.userRoutineLogService.findById(id);
      if (!log) throw new Error('User routine log not found');
      return log;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getRoutineLogs(
    @Query('userRoutineId') userRoutineId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('includeRelations') includeRelations?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('date') date?: string,
    @Query('limit') limit?: number
  ): Promise<UserRoutineLog[]> {
    try {
      if (date) {
        return await this.userRoutineLogService.findByDate(new Date(date));
      }
      if (startDate && endDate) {
        if (userRoutineId) {
          return await this.userRoutineLogService.findAllByUserRoutineBetweenDates(
            userRoutineId,
            new Date(startDate),
            new Date(endDate)
          );
        }
        return await this.userRoutineLogService.findAllBetweenDates(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (userRoutineId) {
        return await this.userRoutineLogService.findAllByUserRoutineWithDetails(userRoutineId);
      }
      if (authUserId) {
        return await this.userRoutineLogService.findByAuthUserId(authUserId);
      }
      if (limit) {
        return await this.userRoutineLogService.findRecentLogs(limit);
      }
      if (includeRelations) {
        return await this.userRoutineLogService.findAllWithRelations();
      }
      return await this.userRoutineLogService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('stats/:userRoutineId')
  async getRoutineStats(@Param('userRoutineId') userRoutineId: string) {
    try {
      return await this.userRoutineLogService.getCompletionStats(userRoutineId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateRoutineLog(
    @Param('id') id: string,
    @Body() userRoutineLog: UserRoutineLog
  ): Promise<UserRoutineLog> {
    try {
      return await this.userRoutineLogService.updateRoutineLog(id, userRoutineLog);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRoutineLog(@Param('id') id: string): Promise<void> {
    try {
      await this.userRoutineLogService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 