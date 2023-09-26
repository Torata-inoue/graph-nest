import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoomModel {
  @Field(() => Int, { name: 'roomId' })
  room_id: number;

  @Field()
  name: string;

  @Field()
  type: 'my' | 'direct' | 'group';

  @Field()
  role: 'admin' | 'member' | 'readonly';

  @Field()
  sticky: boolean;

  @Field(() => Int, { name: 'unreadNum' })
  unread_num: number;

  @Field(() => Int, { name: 'mentionNum' })
  mention_num: number;

  @Field(() => Int, { name: 'mytaskNum' })
  mytask_num: number;

  @Field(() => Int, { name: 'messageNum' })
  message_num: number;

  @Field(() => Int, { name: 'fileNum' })
  file_num: number;

  @Field(() => Int, { name: 'taskNum' })
  task_num: number;

  @Field({ name: 'iconPath' })
  icon_path: string;

  @Field(() => Int, { name: 'lastUpdateTime' })
  last_update_time: number;
}
