import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

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

  @Field()
  @IsNotEmpty()
  to: string;

  @Field()
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
}
