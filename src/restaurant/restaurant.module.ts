import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../entity/Menu.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
