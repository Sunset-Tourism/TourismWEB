import { Injectable } from '@nestjs/common';

@Injectable()
export class TransportService {
  getTransport(): { transport: Array<Record<string, unknown>> } {
    return { transport: [] };
  }
}
