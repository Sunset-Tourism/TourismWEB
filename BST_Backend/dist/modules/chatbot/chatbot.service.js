"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ChatbotService = class ChatbotService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getApiConfig() {
        const apiKey = this.configService.get('GEMINI_API_KEY');
        if (!apiKey)
            return null;
        const model = this.configService.get('GEMINI_MODEL') ?? 'gemini-1.5-flash';
        return { apiKey, model };
    }
    buildRequestBody(message) {
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
    async getChatbotReply(message) {
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
            const data = (await response.json());
            const reply = data.candidates?.[0]?.content?.parts
                ?.map((part) => part.text ?? '')
                .join('')
                .trim() ?? '';
            if (!reply) {
                return {
                    reply: 'I could not generate a response right now. Please try again.',
                };
            }
            return { reply };
        }
        catch {
            return {
                reply: 'I could not reach the AI service right now. Please try again in a moment.',
            };
        }
    }
    async streamChatbotReply(message, onChunk) {
        const config = this.getApiConfig();
        if (!config) {
            onChunk('Chatbot is not configured yet. Please set GEMINI_API_KEY on the backend.');
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
                onChunk('I could not reach the AI service right now. Please try again in a moment.');
                return;
            }
            const decoder = new TextDecoder();
            const reader = response.body.getReader();
            let buffer = '';
            let fullText = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() ?? '';
                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data:'))
                        continue;
                    const payload = trimmed.slice(5).trim();
                    if (!payload || payload === '[DONE]')
                        continue;
                    try {
                        const data = JSON.parse(payload);
                        const text = data.candidates?.[0]?.content?.parts
                            ?.map((part) => part.text ?? '')
                            .join('') ?? '';
                        if (!text)
                            continue;
                        if (text.startsWith(fullText)) {
                            const delta = text.slice(fullText.length);
                            fullText = text;
                            if (delta)
                                onChunk(delta);
                        }
                        else {
                            fullText += text;
                            onChunk(text);
                        }
                    }
                    catch {
                        continue;
                    }
                }
            }
            if (!fullText) {
                onChunk('I could not generate a response right now. Please try again.');
            }
        }
        catch {
            onChunk('I could not reach the AI service right now. Please try again in a moment.');
        }
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map