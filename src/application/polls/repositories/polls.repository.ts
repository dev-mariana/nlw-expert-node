import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePollDTO } from '../dto/create-poll.dto';
import { CreateVoteDTOBody, CreateVoteDTOParam } from '../dto/create-vote.dto';
import { PollEntity } from '../entities/poll';

@Injectable()
export class PollsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(createPollDTO: CreatePollDTO): Promise<PollEntity> {
    const { title, options } = createPollDTO;

    return await this.prismaService.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map((option) => {
              return { title: option };
            }),
          },
        },
      },
      include: {
        options: true,
      },
    });
  }

  async getPoll(id: string): Promise<PollEntity> {
    return await this.prismaService.poll.findUnique({
      where: {
        id,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async createVote(
    { poll_id }: CreateVoteDTOParam,
    { poll_option_id }: CreateVoteDTOBody,
  ): Promise<void> {
    // await this.prismaService.vote.create({
    //   data: {
    //     poll_option_id,
    //   },
    // });
  }
}
