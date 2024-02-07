import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePollDTO } from '../dto/create-poll.dto';
import { PollEntity } from '../entities/poll';

@Injectable()
export class PollsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(CreatePollDTO: CreatePollDTO): Promise<PollEntity> {
    const poll = {
      title: CreatePollDTO.title,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return await this.prismaService.poll.create({ data: poll });
  }
}
