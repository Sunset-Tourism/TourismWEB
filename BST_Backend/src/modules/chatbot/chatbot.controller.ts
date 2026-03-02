import { Body, Controller, Post } from '@nestjs/common';
import { ChatRequestDto } from '../../common/dto/chat-request.dto';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  getChatbotReply(@Body() body: ChatRequestDto): { reply: string } {
    return this.chatbotService.getChatbotReply(body?.message);
  }
}
