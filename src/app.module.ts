import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoryController } from './memory/memory.controller';

@Module({
  imports: [],
  controllers: [AppController, MemoryController],
  providers: [AppService],
})
export class AppModule {}
