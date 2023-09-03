import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SendMessageService } from './send-message.service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule],
  providers: [SendMessageService],
})
export class SendMessageModule {}
