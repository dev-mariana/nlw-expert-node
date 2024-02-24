import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from './redis/redis.service';

@Module({
  providers: [PrismaService, RedisService, Redis],
  exports: [PrismaService, RedisService, Redis],
})
export class DatabaseModule {}
