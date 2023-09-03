import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskService } from '../task/task.service';

@Injectable()
export class SendMessageService {
  constructor(private readonly taskService: TaskService) {}

  @Cron('45 * * * * *')
  async handleCron(): Promise<void> {
    const tasks = await this.taskService.getTasks(1);
  }
}
