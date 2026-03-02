import { HotelsService } from './hotels.service';
export declare class HotelsController {
    private readonly hotelsService;
    constructor(hotelsService: HotelsService);
    getHotels(): {
        hotels: Array<Record<string, unknown>>;
    };
}
