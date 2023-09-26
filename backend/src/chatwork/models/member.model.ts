import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MemberModel {
  @Field(() => Int, { name: 'accountId' })
  account_id: number;

  @Field()
  role: 'admin' | 'member' | 'readonly';

  @Field()
  name: string;

  @Field({ name: 'chatworkId' })
  chatwork_id: string;

  @Field({ name: 'organizationId' })
  organization_id: number;

  @Field({ name: 'organizationName' })
  organization_name: string;

  @Field({ name: 'department' })
  department: string;

  @Field({ name: 'avatarImageUrl' })
  avatar_image_url: string;
}
