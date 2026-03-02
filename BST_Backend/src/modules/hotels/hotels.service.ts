import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsService {
  getHotels(): { hotels: Array<Record<string, unknown>> } {
    return { hotels: [] };
  }
}
