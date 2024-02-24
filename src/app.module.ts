import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { PollsModule } from './application/polls/polls.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    PollsModule,
    DatabaseModule,
    RedisModule.forRoot({
      type: 'single',
      url: 'localhost:6379',
    }),
  ],
})
export class AppModule {}
