import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatbotService {
  getChatbotReply(message?: string): { reply: string } {
    if (!message) {
      return { reply: 'Hello! How can I help you plan your Bhutan trip?' };
    }

    return {
      reply: `Thanks for your message: "${message}". I can help with places, hotels, transport, and itineraries in Bhutan.`,
    };
  }
}
