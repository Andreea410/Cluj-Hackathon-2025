import { Module } from '@nestjs/common';
import { ProductIngredientController } from '../controllers/product-ingredient.controller';
import { ProductIngredientService } from '../services/product-ingredient.service';
import { ProductIngredientRepository } from '../repositories/product-ingredient.repository';

@Module({
  controllers: [ProductIngredientController],
  providers: [ProductIngredientService, ProductIngredientRepository],
  exports: [ProductIngredientService]
})
export class ProductIngredientModule {} 