import { RedisService } from '@infra/database/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { CreatePollDTO } from '../dto/create-poll.dto';
import { CreateVoteDTOBody, CreateVoteDTOParam } from '../dto/create-vote.dto';
import { PollEntity } from '../entities/poll';
import { VoteEntity } from '../entities/vote';
import { PollsRepository } from '../repositories/polls.repository';

@Injectable()
export class PollsService {
  constructor(
    private readonly pollsRepository: PollsRepository,
    private readonly redisService: RedisService,
  ) {}

  async create(CreatePollDTO: CreatePollDTO): Promise<PollEntity> {
    return await this.pollsRepository.create(CreatePollDTO);
  }

  async getPoll(id: string): Promise<PollEntity> {
    return await this.pollsRepository.getPoll(id);
  }

  async createVote(
    { poll_id }: CreateVoteDTOParam,
    { poll_option_id }: CreateVoteDTOBody,
    session_id: string,
  ): Promise<VoteEntity> {
    return await this.pollsRepository.createVote(
      { poll_id },
      { poll_option_id },
      session_id,
    );
  }

  async findVote(session_id: string, poll_id: string): Promise<VoteEntity> {
    return await this.pollsRepository.findVote(session_id, poll_id);
  }

  async deleteVote(id: number): Promise<void> {
    await this.pollsRepository.deleteVote(id);
  }

  async incrementScore(
    sortedSetName: string,
    incrementBy: number,
    member: string,
  ): Promise<string> {
    return await this.redisService.incrementScore(
      sortedSetName,
      incrementBy,
      member,
    );
  }
}
