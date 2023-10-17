import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as process from 'process';
import { RoomModel } from './models/room.model';
import { MemberModel } from './models/member.model';

@Injectable()
export class ChatworkService {
  constructor(private readonly httpService: HttpService) {}

  async postMessage(
    roomId: number,
    toIds: number[],
    body: string,
  ): Promise<void> {
    const endpoint = `https://api.chatwork.com/v2/rooms/${roomId}/messages`;
    const to =
      toIds[0] === -1
        ? '[toall]\n'
        : toIds.map((id) => `[To:${id}]\n`).join('\n');

    const headers = {
      'X-ChatWorkToken': process.env.CHATWORK_TOKEN,
    };

    try {
      await this.httpService
        .post(endpoint, `body=${to}${body}`, { headers })
        .toPromise();
    } catch (error) {
      console.log(error.response);
      throw Error(error.message);
    }
  }

  async postTask(
    roomId: number,
    toIds: number[],
    body: string,
    limit: number,
  ): Promise<void> {
    const endpoint = `https://api.chatwork.com/v2/rooms/${roomId}/tasks`;

    const headers = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
      'x-chatworktoken': process.env.CHATWORK_TOKEN,
    };
    const data = {
      body,
      to_ids: toIds.join(','),
      limit,
      limit_type: 'time',
    };

    try {
      await this.httpService.post(endpoint, data, { headers }).toPromise();
    } catch (error) {
      console.log(error.response);
      throw Error(error.message);
    }
  }

  async getRooms(): Promise<RoomModel[]> {
    const endpoint = 'https://api.chatwork.com/v2/rooms';
    const headers = {
      'X-ChatWorkToken': process.env.CHATWORK_TOKEN,
    };
    try {
      const response = await this.httpService
        .get<RoomModel[]>(endpoint, { headers })
        .toPromise();

      return response.data;
    } catch (error) {
      console.log(error.response);
      throw Error(error.message);
    }
  }

  async getRoomMembers(roomId: number): Promise<MemberModel[]> {
    const endpoint = `https://api.chatwork.com/v2/rooms/${roomId}/members`;
    const headers = {
      'X-ChatWorkToken': process.env.CHATWORK_TOKEN,
    };
    try {
      const response = await this.httpService
        .get<MemberModel[]>(endpoint, { headers })
        .toPromise();

      return response.data;
    } catch (error) {
      console.log(error.response);
      throw Error(error.message);
    }
  }
}
