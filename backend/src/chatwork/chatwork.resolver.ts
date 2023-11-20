import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ChatworkService } from './chatwork.service';
import { RoomModel } from './models/room.model';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { MemberModel } from './models/member.model';
import { GetUser } from '../decorators/user.decorator';
import { User } from '@prisma/client';

@Resolver()
export class ChatworkResolver {
  constructor(private readonly chatworkService: ChatworkService) {}

  @Query(() => [RoomModel!]!)
  @UseGuards(JwtAuthGuard)
  async getRooms(): Promise<RoomModel[]> {
    return await this.chatworkService.getRooms();
  }

  @Query(() => [MemberModel]!)
  @UseGuards(JwtAuthGuard)
  async getMembers(
    @Args('roomId', { type: () => Int }) roomId: number,
    @GetUser() user: User,
  ): Promise<MemberModel[]> {
    const members = await this.chatworkService.getRoomMembers(roomId);
    const isInclude = members.find(
      (member) => member.account_id === parseInt(user.chatworkId),
    );
    return isInclude ? members : [];
  }
}
