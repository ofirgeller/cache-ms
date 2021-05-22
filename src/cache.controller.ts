import { ForbiddenException, HttpCode, Query, Req } from '@nestjs/common';
import { Controller, Delete, Get, NotFoundException, Post } from '@nestjs/common';
import { FastifyRequest } from 'fastify'
import { LRU } from './LRU';
const isLoopbackAddr = require('is-loopback-addr');

@Controller()
export class CacheController {

  static _cache = new LRU(3);

  @Delete()
  @HttpCode(204)
  delete(@Query('key') key: string,) {
    CacheController._cache.delete(key);
  }

  @Get('deleteAll')
  @HttpCode(204)
  deleteAll(@Req() request: FastifyRequest) {
    if (!isLoopbackAddr(request.ip)) {
      throw new ForbiddenException();
    }
    CacheController._cache = new LRU(3);
  }

  @Get()
  get(@Query('key') key: string): string {
    const hasValue = CacheController._cache.has(key);
    if (!hasValue) {
      throw new NotFoundException();
    }
    return CacheController._cache.get(key);
  }

  @Post()
  set(
    @Query('key') key: string,
    @Query('value') value: string) {
    CacheController._cache.set(key, value);
  }

}
