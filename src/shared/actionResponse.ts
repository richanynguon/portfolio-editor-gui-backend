import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ActionResponse{
  @Field()
  path: string;
  @Field()
  message: string;
}