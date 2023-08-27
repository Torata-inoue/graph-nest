import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class DeleteTaskInput {
  @Field(() => Int)
  id: number;
}
