import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreatePollDTO } from '../dto/create-poll.dto';
import { CreateVoteDTOBody, CreateVoteDTOParam } from '../dto/create-vote.dto';
import { PollEntity } from '../entities/poll';
import { PollsRepository } from '../repositories/polls.repository';

@Injectable()
export class PollsService {
  constructor(private readonly pollsRepository: PollsRepository) {}

  async create(CreatePollDTO: CreatePollDTO): Promise<PollEntity> {
    return await this.pollsRepository.create(CreatePollDTO);
  }

  async getPoll(id: string): Promise<PollEntity> {
    return await this.pollsRepository.getPoll(id);
  }

  async createVote(
    { poll_id }: CreateVoteDTOParam,
    { poll_option_id }: CreateVoteDTOBody,
  ): Promise<any> {
    const session_id = randomUUID();

    return await this.pollsRepository.createVote(
      { poll_id },
      { poll_option_id },
    );
  }
}
