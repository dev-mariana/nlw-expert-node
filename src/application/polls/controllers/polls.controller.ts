import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@shared/pipes/zod-validation.pipe';
import { randomUUID } from 'crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePollDTO, createPollSchema } from '../dto/create-poll.dto';
import {
  CreateVoteDTOBody,
  CreateVoteDTOParam,
  createVoteSchemaBody,
  createVoteSchemaParam,
} from '../dto/create-vote.dto';
import { PollEntity } from '../entities/poll';
import { PollsService } from '../services/polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPollSchema))
  async create(@Body() createPollDTO: CreatePollDTO): Promise<PollEntity> {
    return await this.pollsService.create(createPollDTO);
  }

  @Get(':id')
  async getPoll(@Param('id') id: string): Promise<PollEntity> {
    return await this.pollsService.getPoll(id);
  }

  @Post(':poll_id/votes')
  async createVote(
    @Param() { poll_id }: CreateVoteDTOParam,
    @Body() { poll_option_id }: CreateVoteDTOBody,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<any> {
    const voteOnPollBody = createVoteSchemaBody.parse({
      poll_option_id: String(poll_option_id),
    });

    const voteOnPollParams = createVoteSchemaParam.parse({
      poll_id: String(poll_id),
    });

    let { sessionId } = request.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await this.pollsService.findVote(
        sessionId,
        poll_id,
      );

      if (
        userPreviousVoteOnPoll &&
        userPreviousVoteOnPoll.poll_option_id !== poll_option_id
      ) {
        await this.pollsService.deleteVote(userPreviousVoteOnPoll.id);
      } else if (userPreviousVoteOnPoll) {
        throw new BadRequestException('You have already voted on this poll.');
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      response.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      });
    }

    await this.pollsService.createVote(
      voteOnPollParams,
      voteOnPollBody,
      sessionId,
    );

    return { sessionId };
  }
}
