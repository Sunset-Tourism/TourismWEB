import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatRequestDto } from '../../common/dto/chat-request.dto';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async getChatbotReply(@Body() body: ChatRequestDto): Promise<{ reply: string }> {
    return this.chatbotService.getChatbotReply(body?.message);
  }

  @Post('stream')
  async streamChatbotReply(
    @Body() body: ChatRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    const message = body?.message?.trim();
    if (!message) {
      res.status(400).json({ reply: 'Message is required.' });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    await this.chatbotService.streamChatbotReply(message, (chunk) => {
      res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
    });

    res.write('data: [DONE]\n\n');
    res.end();
  }
}
