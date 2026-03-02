import { Controller, Get } from '@nestjs/common';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  getHotels(): { hotels: Array<Record<string, unknown>> } {
    return this.hotelsService.getHotels();
  }
}
