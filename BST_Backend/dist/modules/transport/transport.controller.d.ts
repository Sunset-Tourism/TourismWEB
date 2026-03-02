import { TransportService } from './transport.service';
export declare class TransportController {
    private readonly transportService;
    constructor(transportService: TransportService);
    getTransport(): {
        transport: Array<Record<string, unknown>>;
    };
}
