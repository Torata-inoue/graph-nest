import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SendMessageService } from './send-message.service';
import { TaskModule } from '../task/task.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule, HttpModule],
  providers: [SendMessageService],
})
export class SendMessageModule {}
