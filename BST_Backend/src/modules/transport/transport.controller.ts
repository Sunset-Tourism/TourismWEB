import { Controller, Get } from '@nestjs/common';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Get()
  getTransport(): { transport: Array<Record<string, unknown>> } {
    return this.transportService.getTransport();
  }
}
