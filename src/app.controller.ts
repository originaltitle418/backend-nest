import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  hello() {
    return 'Restaurant Reservation API';
  }
}
