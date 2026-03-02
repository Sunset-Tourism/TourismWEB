import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { ExploreModule } from './modules/explore/explore.module';
import { HealthModule } from './modules/health/health.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { TransportModule } from './modules/transport/transport.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    BookingsModule,
    HotelsModule,
    TransportModule,
    ExploreModule,
    ChatbotModule,
  ],
})
export class AppModule {}
