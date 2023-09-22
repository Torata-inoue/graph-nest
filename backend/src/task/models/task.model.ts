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

  @Field()
  to: string;

  @Field(() => Int)
  dueTime: number;

  @Field()
  isEveryDay: boolean;

  @Field(() => Int, { nullable: true })
  dayOfWeek: number;

  @Field(() => Int, { nullable: true })
  date: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
