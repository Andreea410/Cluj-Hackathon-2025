import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PointTransactionService } from '../services/point-transaction.service';
import { PointTransaction } from '../models/point-transaction.model';

@Controller('point-transactions')
export class PointTransactionController {
  constructor(private readonly pointTransactionService: PointTransactionService) {}

  @Post()
  async createPointTransaction(@Body() pointTransaction: PointTransaction): Promise<PointTransaction> {
    try {
      return await this.pointTransactionService.createPointTransaction(pointTransaction);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk')
  async bulkCreatePointTransactions(
    @Body() data: { transactions: Array<Omit<PointTransaction, 'id'>> }
  ): Promise<PointTransaction[]> {
    try {
      return await this.pointTransactionService.bulkCreatePointTransactions(data.transactions);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getPointTransaction(
    @Param('id') id: string,
    @Query('includeUser') includeUser?: boolean
  ): Promise<PointTransaction> {
    try {
      if (includeUser) {
        const transaction = await this.pointTransactionService.findWithUser(id);
        if (!transaction) throw new Error('Point transaction not found');
        return transaction;
      }
      return await this.pointTransactionService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllPointTransactions(
    @Query('userId') userId?: string,
    @Query('authUserId') authUserId?: string,
    @Query('includeUser') includeUser?: boolean
  ): Promise<PointTransaction[] | { transactions: PointTransaction[], totalPoints: number }> {
    try {
      if (userId && includeUser) {
        const transactions = await this.pointTransactionService.findAllByUserWithDetails(userId);
        const totalPoints = await this.pointTransactionService.getTotalPointsByUser(userId);
        return { transactions, totalPoints };
      }
      if (userId) {
        return await this.pointTransactionService.findByUserId(userId);
      }
      if (authUserId) {
        return await this.pointTransactionService.findByAuthUserId(authUserId);
      }
      if (includeUser) {
        return await this.pointTransactionService.findAllWithUser();
      }
      return await this.pointTransactionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('user/:userId/total')
  async getTotalPointsByUser(@Param('userId') userId: string): Promise<{ totalPoints: number }> {
    try {
      const totalPoints = await this.pointTransactionService.getTotalPointsByUser(userId);
      return { totalPoints };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updatePointTransaction(
    @Param('id') id: string,
    @Body() pointTransaction: Partial<PointTransaction>
  ): Promise<PointTransaction> {
    try {
      return await this.pointTransactionService.updatePointTransaction(id, pointTransaction);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletePointTransaction(@Param('id') id: string): Promise<void> {
    try {
      await this.pointTransactionService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 