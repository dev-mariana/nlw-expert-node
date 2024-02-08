import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@shared/pipes/zod-validation.pipe';
import { CreatePollDTO, createPollSchema } from '../dto/create-poll.dto';
import { PollEntity } from '../entities/poll';
import { PollsService } from '../services/polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPollSchema))
  async create(@Body() CreatePollDTO: CreatePollDTO): Promise<PollEntity> {
    return await this.pollsService.create(CreatePollDTO);
  }

  @Get(':id')
  async getPoll(@Param('id') id: string): Promise<PollEntity> {
    return await this.pollsService.getPoll(id);
  }
}
