import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  body: string;

  @Field(() => Int)
  userId: number;

  @Field()
  isTask: boolean;

  @Field(() => [Int])
  to: number[];

  @Field(() => Int)
  dueTime: number;

  @Field()
  isEveryday: boolean;

  @Field(() => Int, { nullable: true })
  dayOfWeek: number;

  @Field(() => Int, { nullable: true })
  date: number;

  @Field(() => Int)
  roomId: number;

  @Field(() => Int, { nullable: true })
  limitDate: number;

  @Field(() => Int, { nullable: true })
  limitHour: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
