import {
  Controller, Post, UseGuards, Body, Request,
  Get, Query, Delete, Param, ParseIntPipe
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateMenuForm } from './forms';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('menu')
  async createMenu(@Request() req, @Body() body: CreateMenuForm) {
    return this.restaurantService.createMenu(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('menu')
  async getMenus(@Request() req, @Query() query) {
    return this.restaurantService.getMenus(req.user, query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('menu/:id')
  async deleteMenu(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.deleteMenu(req.user, id);
  }
}
