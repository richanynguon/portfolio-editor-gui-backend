import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class SuccessResponse{
  @Field()
  path: string;
  @Field()
  message: string;
}