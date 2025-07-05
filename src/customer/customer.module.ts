import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entity/Reservation.entity';
import { User } from '../entity/User.entity';
import { Menu } from '../entity/Menu.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Menu])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
