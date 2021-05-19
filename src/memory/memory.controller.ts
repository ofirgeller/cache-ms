import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('memory')
export class MemoryController {
  @Get()
  get(): string {
    return 'This action returns all cats';
  }

  @Post()
  set(): string {
    return 'This action returns all cats';
  }

  @Delete()
  delete(): string {
    return 'This action returns all cats';
  }
}
