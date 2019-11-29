import { InputType, Field } from "type-graphql";
import { User } from "../user.entity";

@InputType()
export class ProfileInput implements Partial<User>{

  @Field()
  user_name: string;
  
  @Field()
  user_location: string;

  @Field()
  user_github: string;

  @Field()
  user_twitter: string;

  @Field()
  user_linkedin: string;

  @Field()
  user_stack: string;

  @Field()
  user_learning: string;

  @Field()
  user_interested: string;

  @Field()
  user_involved: string;
}