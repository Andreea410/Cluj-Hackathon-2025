import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { BenefitService } from '../services/benefit.service';
import { Benefit } from '../models/benefit.model';

@Controller('benefits')
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Post()
  async createBenefit(@Body() benefit: Benefit): Promise<Benefit> {
    try {
      return await this.benefitService.createBenefit(benefit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getBenefit(@Param('id') id: string): Promise<Benefit> {
    try {
      return await this.benefitService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllBenefits(): Promise<Benefit[]> {
    try {
      return await this.benefitService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateBenefit(
    @Param('id') id: string,
    @Body() benefit: Partial<Benefit>
  ): Promise<Benefit> {
    try {
      return await this.benefitService.updateBenefit(id, benefit);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteBenefit(@Param('id') id: string): Promise<void> {
    try {
      await this.benefitService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 