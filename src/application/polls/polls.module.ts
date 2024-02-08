import { Module } from '@nestjs/common';
import { PollsController } from './controllers/polls.controller';
import { PollsRepository } from './repositories/polls.repository';
import { PollsService } from './services/polls.service';

@Module({
  controllers: [PollsController],
  providers: [PollsService, PollsRepository],
})
export class PollsModule {}
