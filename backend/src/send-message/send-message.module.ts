import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SendMessageService } from './send-message.service';
import { TaskModule } from '../task/task.module';
import { ChatworkModule } from '../chatwork/chatwork.module';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule, ChatworkModule],
  providers: [SendMessageService],
})
export class SendMessageModule {}
