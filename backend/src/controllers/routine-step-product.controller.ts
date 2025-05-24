import { Controller, Get, Post, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RoutineStepProductService } from '../services/routine-step-product.service';
import { RoutineStepProduct } from '../models/routine-step-product.model';

@Controller('routine-step-products')
export class RoutineStepProductController {
  constructor(private readonly routineStepProductService: RoutineStepProductService) {}

  @Post()
  async createRoutineStepProduct(@Body() routineStepProduct: RoutineStepProduct): Promise<RoutineStepProduct> {
    try {
      return await this.routineStepProductService.createRoutineStepProduct(routineStepProduct);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('step/:stepId/bulk')
  async bulkCreateRoutineStepProducts(
    @Param('stepId') stepId: string,
    @Body() data: { productIds: string[] }
  ): Promise<RoutineStepProduct[]> {
    try {
      return await this.routineStepProductService.bulkCreateRoutineStepProducts(stepId, data.productIds);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getRoutineStepProduct(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<RoutineStepProduct> {
    try {
      if (includeRelations) {
        const association = await this.routineStepProductService.findWithRelations(id);
        if (!association) throw new Error('Routine step product association not found');
        return association;
      }
      const association = await this.routineStepProductService.findById(id);
      if (!association) throw new Error('Routine step product association not found');
      return association;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllRoutineStepProducts(
    @Query('stepId') stepId?: string,
    @Query('productId') productId?: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<RoutineStepProduct[]> {
    try {
      if (stepId && productId) {
        const association = await this.routineStepProductService.findByRoutineStepAndProduct(stepId, productId);
        return association ? [association] : [];
      }
      if (stepId) {
        return await this.routineStepProductService.findAllByStepWithProducts(stepId);
      }
      if (productId) {
        return await this.routineStepProductService.findAllByProductWithSteps(productId);
      }
      if (includeRelations) {
        return await this.routineStepProductService.findAllWithRelations();
      }
      return await this.routineStepProductService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('step/:stepId/products')
  async bulkDeleteRoutineStepProducts(
    @Param('stepId') stepId: string,
    @Body() data: { productIds: string[] }
  ): Promise<void> {
    try {
      await this.routineStepProductService.bulkDeleteRoutineStepProducts(stepId, data.productIds);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRoutineStepProduct(@Param('id') id: string): Promise<void> {
    try {
      await this.routineStepProductService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 