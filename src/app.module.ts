import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './util/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CustomerModule,
    RestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}