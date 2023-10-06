import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  body: string;

  @Field(() => Int)
  userId: number;

  @Field()
  @IsBoolean()
  isTask: boolean;

  @Field(() => [Int])
  @IsNotEmpty()
  to: number[];

  @Field(() => Int)
  @IsNumber()
  dueTime: number;

  @Field()
  @IsBoolean()
  isEveryday: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  dayOfWeek?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  date?: number;

  @Field(() => Int)
  roomId: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limitDate?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limitHour?: number;
}
