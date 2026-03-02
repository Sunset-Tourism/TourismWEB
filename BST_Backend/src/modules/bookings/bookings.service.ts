import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingsService {
  getBookings(): { bookings: Array<Record<string, unknown>> } {
    return { bookings: [] };
  }

  createBooking(): { ok: boolean } {
    return { ok: true };
  }
}
