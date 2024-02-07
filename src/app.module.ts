import { Module } from '@nestjs/common';
import { PollsModule } from './application/polls/polls.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [PollsModule, DatabaseModule],
})
export class AppModule {}
