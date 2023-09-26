import { Module } from '@nestjs/common';
import { ChatworkService } from './chatwork.service';
import { HttpModule } from '@nestjs/axios';
import { ChatworkResolver } from './chatwork.resolver';

@Module({
  imports: [HttpModule],
  providers: [ChatworkService, ChatworkResolver],
  exports: [ChatworkService],
})
export class ChatworkModule {}
