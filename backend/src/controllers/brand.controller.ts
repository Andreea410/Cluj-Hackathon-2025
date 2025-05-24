import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { Brand } from '../models/brand.model';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@Body() brand: Brand): Promise<Brand> {
    try {
      return await this.brandService.createBrand(brand);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getBrand(@Param('id') id: string): Promise<Brand> {
    try {
      return await this.brandService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllBrands(): Promise<Brand[]> {
    try {
      return await this.brandService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() brand: Partial<Brand>
  ): Promise<Brand> {
    try {
      return await this.brandService.updateBrand(id, brand);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string): Promise<void> {
    try {
      await this.brandService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 