import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskService } from '../task/task.service';
import { ChatworkService } from '../chatwork/chatwork.service';
import { Task } from '@prisma/client';

@Injectable()
export class SendMessageService {
  constructor(
    private readonly taskService: TaskService,
    private readonly chatworkService: ChatworkService,
  ) {}

  // @Cron('* 30 * * * *')
  // @Cron('1 * * * * *')
  async handleCron(): Promise<void> {
    const now = new Date();
    const tasks = await this.taskService.getSendTasks(
      now.getHours(),
      now.getDay(),
      now.getDate(),
    );

    tasks.map((task: Task) => {
      // TODO toIdsを配列化
      const toIds = task.to;
      if (task.isTask) {
        const limit = this.getLimit(task, now);
        this.chatworkService.postTask(task.roomId, toIds, task.body, limit);
        return;
      }

      this.chatworkService.postMessage(task.roomId, toIds, task.body);
    });
  }

  getLimit(task: Task, now: Date): number {
    const limit =
      now.getTime() +
      task.limitDate * 24 * 60 * 60 * 1000 +
      task.limitHour * 60 * 60 * 1000;

    return Math.floor(limit) / 1000;
  }
}
