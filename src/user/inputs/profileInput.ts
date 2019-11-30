import { InputType, Field } from "type-graphql";
import { User } from "../user.entity";

@InputType()
export class ProfileInput implements Partial<User>{

  @Field({ nullable: true })
  user_name: string;
  
  @Field({ nullable: true })
  user_location: string;

  @Field({ nullable: true })
  user_github: string;

  @Field({ nullable: true })
  user_twitter: string;

  @Field({ nullable: true })
  user_linkedin: string;

  @Field({ nullable: true })
  user_stack: string;

  @Field({ nullable: true })
  user_learning: string;

  @Field({ nullable: true })
  user_interested: string;

  @Field({ nullable: true })
  user_involved: string;
}