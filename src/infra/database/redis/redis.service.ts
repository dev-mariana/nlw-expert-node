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

  async getRank(
    sortedSetName: string,
    startPosition: number,
    endPosition: number,
  ): Promise<string[]> {
    return await this.redisClient.zrange(
      sortedSetName,
      startPosition,
      endPosition,
      'WITHSCORES',
    );
  }
}
