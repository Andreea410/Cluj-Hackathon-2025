import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../models/payment.model';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() payment: Payment): Promise<Payment> {
    try {
      // Verify the Stripe payment before creating the record
      const isValid = await this.paymentService.verifyStripePayment(payment.stripe_charge_id);
      if (!isValid) {
        throw new Error('Invalid or failed Stripe payment');
      }
      return await this.paymentService.createPayment(payment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getPayment(
    @Param('id') id: string,
    @Query('includeOrder') includeOrder?: boolean
  ): Promise<Payment> {
    try {
      if (includeOrder) {
        const payment = await this.paymentService.findWithOrder(id);
        if (!payment) throw new Error('Payment not found');
        return payment;
      }
      return await this.paymentService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllPayments(
    @Query('orderId') orderId?: string,
    @Query('stripeChargeId') stripeChargeId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('includeOrders') includeOrders?: boolean
  ): Promise<Payment[] | Payment | null> {
    try {
      if (orderId) {
        return await this.paymentService.findByOrderId(orderId);
      }
      if (stripeChargeId) {
        return await this.paymentService.findByStripeChargeId(stripeChargeId);
      }
      if (startDate && endDate) {
        return await this.paymentService.findByDateRange(
          new Date(startDate),
          new Date(endDate)
        );
      }
      if (includeOrders) {
        return await this.paymentService.findAllWithOrders();
      }
      return await this.paymentService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('verify/:stripeChargeId')
  async verifyPayment(@Param('stripeChargeId') stripeChargeId: string): Promise<{ verified: boolean }> {
    try {
      const verified = await this.paymentService.verifyStripePayment(stripeChargeId);
      return { verified };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
} 