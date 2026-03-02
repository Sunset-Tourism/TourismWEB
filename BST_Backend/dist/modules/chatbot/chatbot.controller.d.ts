import type { Response } from 'express';
import { ChatRequestDto } from '../../common/dto/chat-request.dto';
import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    getChatbotReply(body: ChatRequestDto): Promise<{
        reply: string;
    }>;
    streamChatbotReply(body: ChatRequestDto, res: Response): Promise<void>;
}
