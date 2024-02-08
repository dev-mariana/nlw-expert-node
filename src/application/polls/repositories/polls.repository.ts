import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePollDTO } from '../dto/create-poll.dto';
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
}
