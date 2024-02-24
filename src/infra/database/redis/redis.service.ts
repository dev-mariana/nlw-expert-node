import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redisClient: Redis) {}

  async incrementScore(
    sortedSetName: string,
    incrementBy: number,
    member: string,
  ): Promise<string> {
    return await this.redisClient.zincrby(sortedSetName, incrementBy, member);
  }
}
