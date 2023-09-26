import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaskService } from '../task/task.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SendMessageService {
  constructor(
    private readonly taskService: TaskService,
    private readonly httpService: HttpService,
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

    const headers = {
      'X-ChatWorkToken': 'eccbf082087840e4d15c6839fede3a7e',
    };

    tasks.map(async (task) => {
      const endpoint = `https://api.chatwork.com/v2/rooms/${task.roomId}/messages`;
      const toIds = task.to;
      const body = `body=[To:${toIds}]\n${task.body}`;

      try {
        const res = await this.httpService
          .post(endpoint, body, { headers })
          .toPromise();
      } catch (error) {
        console.log(error.response);
      }
    });
  }
}
