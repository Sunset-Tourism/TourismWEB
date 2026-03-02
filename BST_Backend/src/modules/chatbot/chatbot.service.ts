import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatbotService {
  constructor(private readonly configService: ConfigService) {}

  private getApiConfig(): { apiKey: string; model: string } | null {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) return null;

    const model =
      this.configService.get<string>('GEMINI_MODEL') ?? 'gemini-1.5-flash';
    return { apiKey, model };
  }

  private buildRequestBody(message: string): Record<string, unknown> {
    return {
      systemInstruction: {
        parts: [
          {
            text: 'You are a Bhutan travel assistant. Keep replies short, useful, and on-topic to Bhutan travel only. Default to 1-3 short sentences. For greetings like hi/hello, reply with one short friendly line and then ask one travel-focused follow-up question. Do not add unrelated facts, long lists, or extra explanations unless explicitly requested.',
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 400,
      },
    };
  }

  async getChatbotReply(message?: string): Promise<{ reply: string }> {
    if (!message) {
      return { reply: 'Hello! How can I help you plan your Bhutan trip?' };
    }

    const config = this.getApiConfig();
    if (!config) {
      return {
        reply: 'Chatbot is not configured yet. Please set GEMINI_API_KEY on the backend.',
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.buildRequestBody(message)),
      });

      if (!response.ok) {
        return {
          reply: 'I could not reach the AI service right now. Please try again in a moment.',
        };
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
        }>;
      };

      const reply =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text ?? '')
          .join('')
          .trim() ?? '';

      if (!reply) {
        return {
          reply: 'I could not generate a response right now. Please try again.',
        };
      }

      return { reply };
    } catch {
      return {
        reply: 'I could not reach the AI service right now. Please try again in a moment.',
      };
    }
  }

  async streamChatbotReply(
    message: string,
    onChunk: (chunk: string) => void,
  ): Promise<void> {
    const config = this.getApiConfig();
    if (!config) {
      onChunk(
        'Chatbot is not configured yet. Please set GEMINI_API_KEY on the backend.',
      );
      return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:streamGenerateContent?alt=sse&key=${config.apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.buildRequestBody(message)),
      });

      if (!response.ok || !response.body) {
        onChunk(
          'I could not reach the AI service right now. Please try again in a moment.',
        );
        return;
      }

      const decoder = new TextDecoder();
      const reader = response.body.getReader();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const payload = trimmed.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;

          try {
            const data = JSON.parse(payload) as {
              candidates?: Array<{
                content?: { parts?: Array<{ text?: string }> };
              }>;
            };

            const text =
              data.candidates?.[0]?.content?.parts
                ?.map((part) => part.text ?? '')
                .join('') ?? '';

            if (!text) continue;

            if (text.startsWith(fullText)) {
              const delta = text.slice(fullText.length);
              fullText = text;
              if (delta) onChunk(delta);
            } else {
              fullText += text;
              onChunk(text);
            }
          } catch {
            continue;
          }
        }
      }

      if (!fullText) {
        onChunk('I could not generate a response right now. Please try again.');
      }
    } catch {
      onChunk(
        'I could not reach the AI service right now. Please try again in a moment.',
      );
    }
  }
}
