import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class AllProjectsArgs{
  
  @Field()
  take: number;
  
  @Field()
  skip: number;
}