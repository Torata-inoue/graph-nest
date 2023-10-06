import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ChatworkService } from './chatwork.service';
import { RoomModel } from './models/room.model';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { MemberModel } from './models/member.model';

@Resolver()
export class ChatworkResolver {
  constructor(private readonly chatworkService: ChatworkService) {}

  @Query(() => [RoomModel!]!)
  @UseGuards(JwtAuthGuard)
  async getRooms(): Promise<RoomModel[]> {
    return await this.chatworkService.getRooms();
  }

  @Query(() => [MemberModel!]!)
  @UseGuards(JwtAuthGuard)
  async getMembers(
    @Args('roomId', { type: () => Int }) roomId: number,
  ): Promise<MemberModel[]> {
    return await this.chatworkService.getRoomMembers(roomId);
  }
}
