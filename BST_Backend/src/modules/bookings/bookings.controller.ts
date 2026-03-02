import { Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  getBookings(): { bookings: Array<Record<string, unknown>> } {
    return this.bookingsService.getBookings();
  }

  @Post()
  createBooking(): { ok: boolean } {
    return this.bookingsService.createBooking();
  }
}
