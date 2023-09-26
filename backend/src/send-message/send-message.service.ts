import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskService } from '../task/task.service';
import { ChatworkService } from '../chatwork/chatwork.service';

@Injectable()
export class SendMessageService {
  constructor(
    private readonly taskService: TaskService,
    private readonly chatworkService: ChatworkService,
  ) {}

  // @Cron('* 30 * * * *')
  // @Cron('1 * * * * *')
  async handleCron(): Promise<void> {
    // const now = new Date();
    // const tasks = await this.taskService.getSendTasks(
    //   now.getHours(),
    //   now.getDay(),
    //   now.getDate(),
    // );
    //
    // tasks.map((task) => {
    //   const toIds: number[] = JSON.parse(task.to);
    //   this.chatworkService.postMessage(task.roomId, toIds, task.body);
    // });

    this.chatworkService.getRoomMembers(236136302);
  }
}
