import { Controller } from '@nestjs/common';
import { PollsService } from '../services/polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}
}
