import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    getBookings(): {
        bookings: Array<Record<string, unknown>>;
    };
    createBooking(): {
        ok: boolean;
    };
}
