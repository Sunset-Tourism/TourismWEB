"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
function resolveCorsOrigins() {
    const raw = process.env.FRONTEND_URLS ??
        process.env.FRONTEND_URL ??
        'http://localhost:3000';
    return raw
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: resolveCorsOrigins(),
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)({
        filter: (req, res) => {
            if (req.originalUrl?.includes('/api/chatbot/stream')) {
                return false;
            }
            return compression_1.default.filter(req, res);
        },
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableShutdownHooks();
    await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
//# sourceMappingURL=main.js.map