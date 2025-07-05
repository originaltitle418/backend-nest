import {
  Body, Controller, Delete, Get, Param, ParseIntPipe,
  Post, Put, Query, Request, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CustomerService } from './customer.service';
import { CreateReservationForm, UpdateReservationForm } from './forms';

@UseGuards(JwtAuthGuard)
@Controller('reservation')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Request() req, @Body() body: CreateReservationForm) {
    return this.customerService.createReservation(req.user, body);
  }

  @Get()
  async get(@Request() req, @Query() query) {
    return this.customerService.getReservations(req.user, query);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateReservationForm,
  ) {
    return this.customerService.updateReservation(req.user, id, body);
  }

  @Delete(':id')
  async delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteReservation(req.user, id);
  }
}
