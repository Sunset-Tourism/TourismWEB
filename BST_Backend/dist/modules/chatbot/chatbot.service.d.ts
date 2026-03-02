import { ConfigService } from '@nestjs/config';
export declare class ChatbotService {
    private readonly configService;
    constructor(configService: ConfigService);
    private getApiConfig;
    private buildRequestBody;
    getChatbotReply(message?: string): Promise<{
        reply: string;
    }>;
    streamChatbotReply(message: string, onChunk: (chunk: string) => void): Promise<void>;
}
