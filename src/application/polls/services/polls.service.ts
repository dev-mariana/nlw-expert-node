import { Injectable } from '@nestjs/common';
import { CreatePollDTO } from '../dto/create-poll.dto';
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
}
